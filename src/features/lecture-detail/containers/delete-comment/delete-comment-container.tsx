import { FC } from "react";
import { useDeleteCommentMutation } from "api/graphql/generated/graphql";
import { type StoreObject } from "@apollo/client";

import { IDeleteCommentContainer } from "./delete-comment-container.types";
import DeleteComment from "../../views/delete-comment/delete-comment";

const DeleteCommentContainer: FC<IDeleteCommentContainer> = ({ id }) => {
  const [deleteComment, { loading }] = useDeleteCommentMutation({
    variables: id ? { id } : undefined,
    update: (cache, { data }) => {
      const deleteComment = data?.deleteComment;
      if (deleteComment) {
        cache.modify({
          id: cache.identify(deleteComment),
          fields: {
            comments(existingComments, { readField }) {
              return existingComments.filter(
                (commentRef: StoreObject) => id !== readField("id", commentRef)
              );
            },
          },
        });
      }
    },
  });

  return (
    <DeleteComment id={id} deleteComment={deleteComment} loading={loading} />
  );
};

export default DeleteCommentContainer;
