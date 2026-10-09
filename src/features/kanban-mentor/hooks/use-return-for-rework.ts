import { ApolloClient, useApolloClient } from "@apollo/client";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Editor } from "@tiptap/core";

import {
  HomeWorkDocument,
  Maybe,
  StudentHomeWorkStatus,
} from "api/graphql/generated/graphql";
import useSendHomeworkComment from "shared/features/send-comment/use-send-homework-comment";
import {
  CommentContentSyncError,
  EmptyCommentError,
  SubmitHomeworkCommentInput,
} from "shared/features/send-comment/submit-homework-comment";
import type {
  CommentAttachment,
  PendingFile,
} from "shared/components/text-editor/types";

import {
  ReturnForReworkOutcome,
  runReturnForRework,
} from "../helpers/return-for-rework";
import useUpdateHomeworkStatus from "./use-update-homework-status";

export type ReworkPhase = "idle" | "submitting" | "partial" | "done";

export interface ReworkSubmitInput {
  editor?: Maybe<Editor>;
  pendingFiles: PendingFile[];
  deletedFileIds: string[];
  attachments?: CommentAttachment[];
}

interface ReworkReceipt {
  homeworkId: string;
  commentId: string;
  synced: boolean;
  sentHtml: string | null;
}

interface ExecuteDeps {
  submitComment: (
    input: Omit<SubmitHomeworkCommentInput, "homeworkId">
  ) => Promise<{ commentId: string }>;
  notApproved: ReturnType<typeof useUpdateHomeworkStatus>["notApproved"];
  client: ApolloClient<object>;
}

const phaseForOutcome = (outcome: ReturnForReworkOutcome): ReworkPhase => {
  if (outcome.kind === "done") return "done";
  if (outcome.kind === "status-failed") return "partial";
  return "idle";
};

interface ExecuteInput {
  homeworkId: string;
  input: ReworkSubmitInput;
  receipt: ReworkReceipt | null;
  deps: ExecuteDeps;
  persistReceipt: (value: ReworkReceipt | null) => void;
}

const executeReturn = ({
  homeworkId,
  input,
  receipt,
  deps,
  persistReceipt,
}: ExecuteInput): Promise<ReturnForReworkOutcome> => {
  const persistComment = async (): Promise<string> => {
    if (!input.editor) throw new EmptyCommentError();
    try {
      const result = await deps.submitComment({
        editor: input.editor,
        pendingFiles: input.pendingFiles,
        deletedFileIds: input.deletedFileIds,
        attachments: input.attachments,
        commentId: receipt?.commentId ?? null,
        sentHtml: receipt?.sentHtml ?? null,
      });
      persistReceipt({
        homeworkId,
        commentId: result.commentId,
        synced: true,
        sentHtml: null,
      });
      return result.commentId;
    } catch (error) {
      if (error instanceof CommentContentSyncError) {
        persistReceipt({
          homeworkId,
          commentId: error.commentId,
          synced: false,
          sentHtml: error.sentHtml,
        });
      }
      throw error;
    }
  };

  return runReturnForRework(
    {
      homeworkId,
      commentId: receipt?.synced ? receipt.commentId : null,
    },
    {
      submitComment: receipt?.synced ? undefined : persistComment,
      notApproved: (id) =>
        deps
          .notApproved({ variables: { homeWorkId: id } })
          .then(() => undefined),
      fetchStatus: async (id) => {
        const { data } = await deps.client.query({
          query: HomeWorkDocument,
          variables: { homeWorkId: id },
          fetchPolicy: "network-only",
        });
        return data?.homeWork?.status ?? null;
      },
      expectedStatus: StudentHomeWorkStatus.NotApproved,
    }
  );
};

const useReturnForRework = (homeworkId?: Maybe<string>) => {
  const client = useApolloClient();
  const { submit: submitComment } = useSendHomeworkComment(homeworkId);
  const { notApproved } = useUpdateHomeworkStatus();

  const [phase, setPhase] = useState<ReworkPhase>("idle");
  const [outcome, setOutcome] = useState<ReturnForReworkOutcome | null>(null);
  const receiptRef = useRef<ReworkReceipt | null>(null);
  const inFlightRef = useRef(false);
  const generationRef = useRef(0);

  useEffect(() => {
    generationRef.current += 1;
    receiptRef.current = null;
    inFlightRef.current = false;
    setPhase("idle");
    setOutcome(null);
  }, [homeworkId]);

  const submit = useCallback(
    async (
      input: ReworkSubmitInput
    ): Promise<ReturnForReworkOutcome | null> => {
      if (!homeworkId || inFlightRef.current) return null;

      const generation = generationRef.current;
      const stored = receiptRef.current;
      const receipt = stored?.homeworkId === homeworkId ? stored : null;

      inFlightRef.current = true;
      setPhase("submitting");
      setOutcome(null);

      const persistReceipt = (value: ReworkReceipt | null) => {
        if (generation === generationRef.current) {
          receiptRef.current = value;
        }
      };

      const result = await executeReturn({
        homeworkId,
        input,
        receipt,
        deps: { submitComment, notApproved, client },
        persistReceipt,
      });

      if (generation !== generationRef.current) return null;

      inFlightRef.current = false;
      setOutcome(result);
      setPhase(phaseForOutcome(result));

      return result;
    },
    [homeworkId, submitComment, notApproved, client]
  );

  const receipt = receiptRef.current;
  const usableReceipt = receipt?.homeworkId === homeworkId ? receipt : null;

  return {
    submit,
    phase,
    outcome,
    commentId: usableReceipt?.commentId ?? null,
    commentSynced: usableReceipt?.synced ?? false,
  };
};

export default useReturnForRework;
