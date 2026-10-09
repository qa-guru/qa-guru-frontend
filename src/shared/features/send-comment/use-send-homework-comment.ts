import { useCallback, useEffect, useRef, useState } from "react";
import { HOMEWORK_COMMENT_FILE_GET_URI } from "config";

import {
  Maybe,
  SendCommentMutationFn,
  UpdateCommentMutationFn,
  useSendCommentMutation,
  useUpdateCommentMutation,
} from "api/graphql/generated/graphql";
import {
  useHomeworkCommentFileDelete,
  useHomeworkCommentFileUpload,
} from "shared/hooks";

import {
  CommentContentSyncError,
  submitHomeworkComment,
  SubmitHomeworkCommentInput,
} from "./submit-homework-comment";
import { updateCommentsCache } from "./update-comments-cache";

interface CommentSubmitOptions {
  scope?: Maybe<string>;
  sendComment?: SendCommentMutationFn;
  updateComment?: UpdateCommentMutationFn;
}

interface CommentReceipt {
  scope: string;
  error: CommentContentSyncError;
}

const resumeReceipt = (
  stored: CommentReceipt | null,
  scope: string,
  commentId?: Maybe<string>
) => {
  if (
    !stored ||
    stored.scope !== scope ||
    (commentId && commentId !== stored.error.commentId)
  )
    return null;
  return stored.error;
};

const useSendHomeworkComment = (
  homeworkId?: Maybe<string>,
  options: CommentSubmitOptions = {}
) => {
  const scope = options.scope ?? homeworkId;
  const [sendComment, { loading: loadingSendComment }] = useSendCommentMutation(
    {
      update: updateCommentsCache(homeworkId),
    }
  );

  const [updateComment, { loading: loadingUpdateComment }] =
    useUpdateCommentMutation({
      update: (cache, { data }) => {
        const updateComment = data?.updateComment;

        if (updateComment) {
          cache.modify({
            id: cache.identify(updateComment),
            fields: {
              content() {
                return updateComment?.content;
              },
            },
          });
        }
      },
    });

  const { uploadHomeworkCommentFile } = useHomeworkCommentFileUpload();
  const { deleteHomeworkCommentFile } = useHomeworkCommentFileDelete();

  const [submitting, setSubmitting] = useState(false);
  const receiptRef = useRef<CommentReceipt | null>(null);
  const inFlightRef = useRef<Promise<{ commentId: string }> | null>(null);
  const generationRef = useRef(0);

  useEffect(() => {
    generationRef.current += 1;
    receiptRef.current = null;
    inFlightRef.current = null;
    setSubmitting(false);
    return () => {
      generationRef.current += 1;
    };
  }, [scope]);

  const createComment = options.sendComment ?? sendComment;
  const syncComment = options.updateComment ?? updateComment;
  const canCreate = Boolean(homeworkId || options.sendComment);
  const targetHomeworkId = homeworkId ?? "";

  const submit = useCallback(
    (input: Omit<SubmitHomeworkCommentInput, "homeworkId">) => {
      if (!scope) {
        throw new Error("Comment scope is required to submit a comment");
      }
      if (inFlightRef.current) return inFlightRef.current;

      const generation = generationRef.current;
      const receipt = resumeReceipt(receiptRef.current, scope, input.commentId);
      const commentId = input.commentId ?? receipt?.commentId;
      if (!commentId && !canCreate)
        throw new Error("A homework or comment creator is required");
      setSubmitting(true);
      const promise = submitHomeworkComment(
        {
          sendComment: createComment,
          updateComment: syncComment,
          uploadFile: uploadHomeworkCommentFile,
          deleteFile: deleteHomeworkCommentFile,
          commentFileGetUri: HOMEWORK_COMMENT_FILE_GET_URI,
        },
        {
          homeworkId: targetHomeworkId,
          ...input,
          commentId,
          sentHtml: receipt?.sentHtml ?? input.sentHtml,
          uploadedFiles: receipt?.uploadedFiles ?? input.uploadedFiles,
          confirmedDeletedFileIds:
            receipt?.confirmedDeletedFileIds ?? input.confirmedDeletedFileIds,
        }
      )
        .then((result) => {
          if (generation === generationRef.current) receiptRef.current = null;
          return result;
        })
        .catch((error: unknown) => {
          if (
            generation === generationRef.current &&
            error instanceof CommentContentSyncError
          ) {
            receiptRef.current = { scope, error };
          }
          throw error;
        })
        .finally(() => {
          if (generation === generationRef.current) {
            inFlightRef.current = null;
            setSubmitting(false);
          }
        });
      inFlightRef.current = promise;
      return promise;
    },
    [
      targetHomeworkId,
      scope,
      createComment,
      syncComment,
      canCreate,
      uploadHomeworkCommentFile,
      deleteHomeworkCommentFile,
    ]
  );

  return {
    submit,
    loading: submitting || loadingSendComment || loadingUpdateComment,
  };
};

export default useSendHomeworkComment;
