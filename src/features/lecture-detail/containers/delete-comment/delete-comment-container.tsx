import { FC } from "react";
import { useDeleteCommentMutation } from "api/graphql/generated/graphql";

import { IDeleteCommentContainer } from "./delete-comment-container.types";
import DeleteComment from "../../views/delete-comment/delete-comment";

type DeleteCommentItem = {
  __ref: string;
};

const DeleteCommentContainer: FC<IDeleteCommentContainer> = ({ id }) => {
  const [deleteComment, { loading }] = useDeleteCommentMutation({
    update: (cache, { data }) => {
      const deletedCommentId = data?.deleteComment?.id;

      cache.modify({
        fields: {
          commentsHomeWorkByHomeWork(existingCommentsRef, { readField }) {
            return existingCommentsRef.items.filter(
              (commentRef: DeleteCommentItem) =>
                deletedCommentId !== readField("id", commentRef)
            );
          },
        },
      });
    },
  });

  return <DeleteComment id={id} deleteComment={deleteComment} />;
};

export default DeleteCommentContainer;
