import type { Editor } from "@tiptap/core";

import {
  Maybe,
  StudentHomeWorkDto,
  StudentHomeWorkStatus,
  UpdateHomeworkMutationFn,
  SendHomeWorkToCheckMutationFn,
} from "api/graphql/generated/graphql";
import type { PendingFile } from "shared/components/text-editor/types";
import {
  GraphqlLikeError,
  isGraphqlInvalidHomeworkState,
  isGraphqlNotFound,
} from "shared/helpers";
import { collectFileIds } from "shared/lib/mui-tiptap";
import { blobUrlToFile } from "shared/lib/mui-tiptap/utils/blob-url-to-file";
import { findNodeByUrl } from "shared/lib/mui-tiptap/utils/find-node-by-url";
import { createUrlWithParams } from "shared/utils";

type HomeworkResponse = Pick<
  StudentHomeWorkDto,
  "id" | "answer" | "status" | "updateDate"
>;
export type ConfirmedHomeworkRevision = HomeworkResponse & {
  id: string;
  answer: string;
  status: StudentHomeWorkStatus;
};

export interface HomeworkRevisionReceipt {
  homeworkId: string;
  saved?: { html: string; homework: ConfirmedHomeworkRevision };
  uploadedFiles: Array<{ localUrl: string; realUrl: string }>;
  deletedFileIds: string[];
}

export type HomeworkRevisionFailureReason = "state" | "notFound";

export class HomeworkRevisionError extends Error {
  public readonly reason?: HomeworkRevisionFailureReason;

  constructor(
    public readonly stage: "empty" | "save" | "submit",
    options?: { cause?: unknown; reason?: HomeworkRevisionFailureReason }
  ) {
    super(`Homework revision failed at ${stage}`, options);
    this.name = "HomeworkRevisionError";
    this.reason = options?.reason;
  }
}

const httpStatusOf = (cause: unknown): unknown =>
  typeof cause === "object" && cause !== null
    ? (cause as { response?: { status?: unknown } }).response?.status ??
      (cause as { status?: unknown }).status
    : undefined;

const revisionFailureReason = (
  cause: unknown
): HomeworkRevisionFailureReason | undefined => {
  if (
    httpStatusOf(cause) === 404 ||
    isGraphqlNotFound(cause as GraphqlLikeError)
  )
    return "notFound";
  if (isGraphqlInvalidHomeworkState(cause as GraphqlLikeError)) return "state";
  return undefined;
};

export interface HomeworkRevisionDeps {
  updateHomework: UpdateHomeworkMutationFn;
  sendHomeWorkToCheck?: SendHomeWorkToCheckMutationFn;
  uploadFile: (
    file: File,
    homeworkId: string
  ) => Promise<Maybe<{ id?: Maybe<string> }>>;
  deleteFile: (homeworkId: string, fileId: string) => Promise<unknown>;
  homeworkFileGetUri: string;
  isCurrent: () => boolean;
}

export interface HomeworkRevisionInput {
  homeworkId: string;
  editor: Editor;
  pendingFiles: PendingFile[];
  deletedFileIds: string[];
  resubmit: boolean;
}

const confirmHomework = (
  homework: Maybe<HomeworkResponse> | undefined,
  homeworkId: string,
  html: string
): ConfirmedHomeworkRevision => {
  if (
    homework?.id !== homeworkId ||
    homework.answer !== html ||
    !homework.status ||
    !Object.values(StudentHomeWorkStatus).includes(homework.status)
  ) {
    throw new Error("The server did not confirm the homework revision");
  }
  return { ...homework, id: homeworkId, answer: html, status: homework.status };
};

const uploadRevisionFiles = async (
  deps: HomeworkRevisionDeps,
  input: HomeworkRevisionInput,
  receipt: HomeworkRevisionReceipt,
  html: string
): Promise<string | null> => {
  const { doc } = input.editor.state;
  const pending = new Map(
    input.pendingFiles.map(({ localUrl, file }) => [localUrl, file])
  );
  const blobUrls = new Set(
    Array.from(html.matchAll(/blob:[^"'\s<>]+/g), (match) => match[0])
  );
  for (const localUrl of blobUrls) {
    if (!deps.isCurrent()) return null;
    if (receipt.uploadedFiles.some((file) => file.localUrl === localUrl))
      continue;
    const file =
      pending.get(localUrl) ??
      (await blobUrlToFile(
        localUrl,
        findNodeByUrl(doc, localUrl)?.fileName || "recovered_file"
      ));
    if (!deps.isCurrent()) return null;
    const uploaded = await deps.uploadFile(file, input.homeworkId);
    if (typeof uploaded?.id !== "string" || !uploaded.id.trim()) {
      throw new Error("Upload did not return a confirmed file id");
    }
    receipt.uploadedFiles.push({
      localUrl,
      realUrl: createUrlWithParams(deps.homeworkFileGetUri, {
        homeWorkId: input.homeworkId,
        fileId: uploaded.id,
      }),
    });
  }
  const urls = new Map(
    receipt.uploadedFiles.map(({ localUrl, realUrl }) => [localUrl, realUrl])
  );
  return html.replace(/blob:[^"'\s<>]+/g, (url) => urls.get(url) ?? url);
};

const deleteRevisionFiles = async (
  deps: HomeworkRevisionDeps,
  input: HomeworkRevisionInput,
  receipt: HomeworkRevisionReceipt,
  currentFileIds: string[]
): Promise<boolean> => {
  for (const fileId of input.deletedFileIds) {
    if (
      currentFileIds.includes(fileId) ||
      receipt.deletedFileIds.includes(fileId)
    )
      continue;
    if (!deps.isCurrent()) return false;
    const result = await deps.deleteFile(input.homeworkId, fileId);
    if (result === null) throw new Error("File deletion was not confirmed");
    receipt.deletedFileIds.push(fileId);
    if (!deps.isCurrent()) return false;
  }
  return true;
};

export const submitHomeworkRevision = async (
  deps: HomeworkRevisionDeps,
  input: HomeworkRevisionInput,
  receipt: HomeworkRevisionReceipt
): Promise<ConfirmedHomeworkRevision | null> => {
  if (receipt.homeworkId !== input.homeworkId) {
    throw new Error("The save receipt belongs to another homework");
  }
  const html = input.editor.getHTML().trim();
  if (!html || html === "<p></p>") throw new HomeworkRevisionError("empty");
  const currentFileIds = collectFileIds(input.editor.state.doc);
  let stage: "save" | "submit" = "save";
  try {
    const content = await uploadRevisionFiles(deps, input, receipt, html);
    if (content === null || !deps.isCurrent()) return null;
    if (receipt.saved?.html !== content) {
      const response = await deps.updateHomework({
        variables: { id: input.homeworkId, content },
      });
      const homework = confirmHomework(
        response.data?.updateHomeWork,
        input.homeworkId,
        content
      );
      receipt.saved = { html: content, homework };
    }
    if (!deps.isCurrent()) return null;
    if (
      !(await deleteRevisionFiles(deps, input, receipt, currentFileIds)) ||
      !deps.isCurrent()
    )
      return null;
    if (!input.resubmit) return receipt.saved!.homework;
    stage = "submit";
    if (!deps.sendHomeWorkToCheck) {
      throw new Error("The submission mutation is required");
    }
    const response = await deps.sendHomeWorkToCheck({
      variables: { homeWorkId: input.homeworkId },
    });
    const homework = confirmHomework(
      response.data?.sendHomeWorkToCheck,
      input.homeworkId,
      content
    );
    return deps.isCurrent() ? homework : null;
  } catch (cause) {
    throw new HomeworkRevisionError(stage, {
      cause,
      reason: revisionFailureReason(cause),
    });
  }
};
