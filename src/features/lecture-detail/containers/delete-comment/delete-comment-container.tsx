import { FC } from "react";
import {
  CommentHomeWorkSortField,
  CommentsHomeWorkByHomeWorkDocument,
  CommentsHomeWorkByHomeWorkQuery,
  Maybe,
  Order,
  useDeleteCommentMutation,
} from "api/graphql/generated/graphql";

import { IDeleteCommentContainer } from "./delete-comment-container.types";
import DeleteComment from "../../views/delete-comment";
import { QUERY_DEFAULTS } from "../../constants";

const DeleteCommentContainer: FC<IDeleteCommentContainer> = ({ id }) => {
  const [deleteComment, { loading }] = useDeleteCommentMutation({
    update: (cache) => {
      const existingComments: Maybe<CommentsHomeWorkByHomeWorkQuery> =
        cache.readQuery({
          query: CommentsHomeWorkByHomeWorkDocument,
          variables: {
            offset: QUERY_DEFAULTS.OFFSET,
            limit: QUERY_DEFAULTS.LIMIT,
            sort: {
              field: CommentHomeWorkSortField.CreationDate,
              order: Order.Desc,
            },
            homeWorkId: id,
          },
        });

      const updatedComments =
        existingComments?.commentsHomeWorkByHomeWork?.items?.filter(
          (comment) => comment?.id !== id
        );

      cache.writeQuery({
        query: CommentsHomeWorkByHomeWorkDocument,
        variables: {
          offset: QUERY_DEFAULTS.OFFSET,
          limit: QUERY_DEFAULTS.LIMIT,
          sort: {
            field: CommentHomeWorkSortField.CreationDate,
            order: Order.Desc,
          },
          homeWorkId: id,
        },
        data: {
          commentsHomeWorkByHomeWork: {
            ...existingComments?.commentsHomeWorkByHomeWork,
            items: [updatedComments],
          },
        },
      });
    },
  });

  return (
    <DeleteComment id={id} deleteComment={deleteComment} loading={loading} />
  );
};

export default DeleteCommentContainer;
