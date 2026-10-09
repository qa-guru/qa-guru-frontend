import type { Editor } from "@tiptap/core";

import type {
  Maybe,
  SendCommentMutationFn,
  UpdateCommentMutationFn,
} from "api/graphql/generated/graphql";
import { collectFileIds } from "shared/lib/mui-tiptap";
import { blobUrlToFile } from "shared/lib/mui-tiptap/utils/blob-url-to-file";
import { findNodeByUrl } from "shared/lib/mui-tiptap/utils/find-node-by-url";
import { createUrlWithParams } from "shared/utils";
import type {
  CommentAttachment,
  PendingFile,
} from "shared/components/text-editor/types";
import {
  commentAttachmentId,
  serializeCommentContent,
  splitCommentAttachments,
} from "shared/components/text-editor/text-view/prepare-read-only-html";

export interface UploadedCommentFile {
  localUrl: string;
  fileId: string;
  realUrl: string;
}

export class EmptyCommentError extends Error {
  constructor() {
    super("Comment content is empty");
    this.name = "EmptyCommentError";
  }
}

export class CommentContentSyncError extends Error {
  readonly confirmedDeletedFileIds: string[];

  constructor(
    public readonly commentId: string,
    public readonly sentHtml: string,
    public readonly uploadedFiles: UploadedCommentFile[] = [],
    options?: { cause?: unknown; confirmedDeletedFileIds?: string[] }
  ) {
    super("Comment was saved but its content could not be synced", options);
    this.name = "CommentContentSyncError";
    this.confirmedDeletedFileIds = [
      ...(options?.confirmedDeletedFileIds ?? []),
    ];
  }
}

export interface SubmitHomeworkCommentDeps {
  sendComment: SendCommentMutationFn;
  updateComment: UpdateCommentMutationFn;
  uploadFile: (
    file: File,
    commentId: string
  ) => Promise<Maybe<{ id?: Maybe<string> }>>;
  deleteFile: (commentId: string, fileId: string) => Promise<unknown>;
  commentFileGetUri: string;
}

export interface SubmitHomeworkCommentInput {
  homeworkId: string;
  editor: Editor;
  pendingFiles: PendingFile[];
  deletedFileIds: string[];
  commentId?: Maybe<string>;
  sentHtml?: Maybe<string>;
  uploadedFiles?: UploadedCommentFile[];
  confirmedDeletedFileIds?: string[];
  attachments?: CommentAttachment[];
}

const syncCommentFiles = async (
  deps: SubmitHomeworkCommentDeps,
  {
    editor,
    pendingFiles,
    commentId,
    html,
    uploadedFiles,
    attachments,
  }: {
    editor: Editor;
    pendingFiles: PendingFile[];
    commentId: string;
    html: string;
    uploadedFiles: UploadedCommentFile[];
    attachments: CommentAttachment[];
  }
): Promise<string> => {
  const blobUrls = Array.from(
    new Set(Array.from(html.matchAll(/(blob:[^"'\s>]+)/g), (match) => match[1]))
  );
  const pendingByUrl = new Map(
    pendingFiles.map((file) => [file.localUrl, file.file])
  );
  const confirmedUrls = new Set(uploadedFiles.map((file) => file.localUrl));
  const results = await Promise.allSettled(
    blobUrls
      .filter((url) => !confirmedUrls.has(url))
      .map(async (localUrl) => {
        const pending = pendingByUrl.get(localUrl);
        const file =
          pending ??
          (await blobUrlToFile(
            localUrl,
            attachments.find((file) => file.href === localUrl)?.fileName ||
              findNodeByUrl(editor.state.doc, localUrl)?.fileName ||
              "recovered_file"
          ));
        const uploaded = await deps.uploadFile(file, commentId);
        if (typeof uploaded?.id !== "string" || !uploaded.id.trim()) {
          throw new Error("Upload did not return a confirmed file id");
        }
        uploadedFiles.push({
          localUrl,
          fileId: uploaded.id,
          realUrl: createUrlWithParams(deps.commentFileGetUri, {
            commentId,
            fileId: uploaded.id,
          }),
        });
      })
  );
  const failed = results.find((result) => result.status === "rejected");
  if (failed?.status === "rejected") throw failed.reason;

  const urls = new Map(
    uploadedFiles.map((file) => [file.localUrl, file.realUrl])
  );
  return html.replace(/blob:[^"'\s>]+/g, (url) => urls.get(url) ?? url);
};

export const submitHomeworkComment = async (
  deps: SubmitHomeworkCommentDeps,
  input: SubmitHomeworkCommentInput
): Promise<{ commentId: string }> => {
  const { editor, homeworkId, pendingFiles, deletedFileIds } = input;
  const editorHtml = editor.getHTML().trim();
  const attachments =
    input.attachments ?? splitCommentAttachments(editorHtml).attachments;
  let html = serializeCommentContent(editorHtml, attachments);
  if (!html || html === "<p></p>") {
    throw new EmptyCommentError();
  }

  let serverHtml = input.sentHtml ?? null;
  let { commentId } = input;
  if (!commentId) {
    const response = await deps.sendComment({
      variables: { homeWorkId: homeworkId, content: html },
    });
    commentId = response.data?.sendComment?.id;
    if (!commentId) {
      throw new Error("sendComment did not return a comment id");
    }
    serverHtml = html;
  }

  const resolvedCommentId: string = commentId;
  const uploadedFiles = [...(input.uploadedFiles ?? [])];
  const confirmedDeletedFileIds = new Set(input.confirmedDeletedFileIds ?? []);

  try {
    html = await syncCommentFiles(deps, {
      editor,
      pendingFiles,
      commentId: resolvedCommentId,
      html,
      uploadedFiles,
      attachments,
    });
    if (html !== serverHtml) {
      await deps.updateComment({
        variables: { id: resolvedCommentId, content: html },
      });
      serverHtml = html;
    }

    const currentFileIds = [
      ...collectFileIds(editor.state.doc),
      ...attachments.map(({ href }) => commentAttachmentId(href)),
    ];
    const stillDeleted = [...new Set(deletedFileIds)].filter(
      (id) => !currentFileIds.includes(id) && !confirmedDeletedFileIds.has(id)
    );

    for (const id of stillDeleted) {
      const removed = await deps.deleteFile(resolvedCommentId, id);
      if (removed === null) {
        throw new Error("Comment file delete was not confirmed");
      }
      confirmedDeletedFileIds.add(id);
    }
  } catch (error) {
    throw new CommentContentSyncError(
      resolvedCommentId,
      serverHtml ?? html,
      uploadedFiles,
      { cause: error, confirmedDeletedFileIds: [...confirmedDeletedFileIds] }
    );
  }

  return { commentId: resolvedCommentId };
};
