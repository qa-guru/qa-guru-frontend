import { FC } from "react";

import { useUpdateCommentMutation } from "api/graphql/generated/graphql";

import { IUpdateCommentContainer } from "./update-comment-container.types";
import UpdateComment from "../view";

const UpdateCommentContainer: FC<IUpdateCommentContainer> = (props) => {
  const { commentId, content } = props;
  const [updateComment, { loading }] = useUpdateCommentMutation({
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

  return (
    <UpdateComment
      commentId={commentId}
      updateComment={updateComment}
      loading={loading}
      content={content}
    />
  );
};

export default UpdateCommentContainer;
