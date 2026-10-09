import { FC } from "react";

import { useComment } from "shared/hooks/use-comment";
import SendComment from "shared/features/send-comment/view";
import useSendHomeworkComment from "shared/features/send-comment/use-send-homework-comment";

import { IUpdateComment } from "./update-comment.types";

const UpdateComment: FC<IUpdateComment> = (props) => {
  const { loading, updateComment, commentId, content } = props;
  const { setSelectedComment } = useComment();
  const { submit, loading: submitting } = useSendHomeworkComment(undefined, {
    scope: commentId ? `comment:${commentId}` : null,
    updateComment,
  });

  return (
    <SendComment
      key={commentId}
      submitComment={submit}
      loading={loading || submitting}
      content={content}
      commentId={commentId}
      hideCancel={false}
      onSuccess={() => setSelectedComment(null)}
      onCancel={() => setSelectedComment(null)}
    />
  );
};

export default UpdateComment;
