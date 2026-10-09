import { FC, useCallback } from "react";

import { SendCommentMutationFn } from "api/graphql/generated/graphql";
import UserRow from "shared/components/user-row";
import SendComment from "shared/features/send-comment/view";
import useSendHomeworkComment from "shared/features/send-comment/use-send-homework-comment";

import { StyledCommentBox, StyledCommentStack } from "./answer-comment.styled";
import { IAnswerComment } from "./answer-comment.types";

const AnswerComment: FC<IAnswerComment> = (props) => {
  const { answerComment, loading, commentId, dataUser, onReplySuccess } = props;
  const sendReply = useCallback<SendCommentMutationFn>(
    async (options) => {
      if (!commentId) throw new Error("Reply parent is required");
      const result = await answerComment({
        variables: {
          parentID: commentId,
          content: options?.variables?.content ?? "",
        },
      });
      return {
        ...result,
        data: { sendComment: result.data?.answerComment ?? null },
      };
    },
    [answerComment, commentId]
  );
  const { submit, loading: submitting } = useSendHomeworkComment(undefined, {
    scope: commentId ? `reply:${commentId}` : null,
    sendComment: sendReply,
  });

  return (
    <StyledCommentStack>
      <UserRow
        user={dataUser?.user}
        userId={dataUser?.user?.id}
        hideFullName
        hideRating
        hasLink
      />
      <StyledCommentBox>
        <SendComment
          key={commentId}
          submitComment={submit}
          loading={loading || submitting}
          onSuccess={onReplySuccess}
          onCancel={onReplySuccess}
          hideCancel={false}
        />
      </StyledCommentBox>
    </StyledCommentStack>
  );
};

export default AnswerComment;
