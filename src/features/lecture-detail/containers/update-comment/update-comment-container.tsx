import React from "react";
import { IUpdateCommentContainer } from "./update-comment-container.types";
import UpdateComment from "../../views/update-comment";
import { useUpdateCommentMutation } from "../../../../api/graphql/generated/graphql";

const UpdateCommentContainer: React.FC<IUpdateCommentContainer> = ({
  id,
  setSelectedIndex,
  content,
}) => {
  const [updateComment, { loading }] = useUpdateCommentMutation({
    update: (cache, { data }) => {
      const updatedComment = data?.updateComment;
      if (updatedComment) {
        cache.modify({
          id: cache.identify(updatedComment),
          fields: {
            content() {
              return updatedComment.content ?? null;
            },
          },
        });
      }
    },
  });

  return (
    <UpdateComment
      setSelectedIndex={setSelectedIndex}
      id={id}
      updateComment={updateComment}
      loading={loading}
      content={content}
    />
  );
};

export default UpdateCommentContainer;
