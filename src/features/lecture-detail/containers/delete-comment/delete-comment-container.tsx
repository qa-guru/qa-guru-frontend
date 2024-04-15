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
import { INDEX_OFFSET, PARSE_INT_RADIX, QUERY_DEFAULTS } from "../../constants";

interface Comment {
  id?: string;
  children?: Comment[];
}

function removeCommentAndChildren(
  comments: Comment[],
  commentId?: Maybe<string>
): Comment[] {
  function recursivelyRemove(
    comments: Comment[],
    commentId?: Maybe<string>
  ): Comment[] {
    const result: Comment[] = [];

    for (const comment of comments) {
      if (comment.id === commentId) continue;

      const commentCopy = { ...comment };

      if (comment.children && comment.children.length > 0) {
        commentCopy.children = recursivelyRemove(comment.children, commentId);
      }

      result.push(commentCopy);
    }

    return result;
  }

  return recursivelyRemove(comments, commentId);
}

const DeleteCommentContainer: FC<IDeleteCommentContainer> = ({
  id,
  homeworkId,
}) => {
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
            homeWorkId: homeworkId,
          },
        });

      let updatedComments: Comment[] = [];
      const items = existingComments?.commentsHomeWorkByHomeWork
        ?.items as Comment[];

      updatedComments = removeCommentAndChildren(items, id);

      cache.writeQuery({
        query: CommentsHomeWorkByHomeWorkDocument,
        variables: {
          offset: QUERY_DEFAULTS.OFFSET,
          limit: QUERY_DEFAULTS.LIMIT,
          sort: {
            field: CommentHomeWorkSortField.CreationDate,
            order: Order.Desc,
          },
          homeWorkId: homeworkId,
        },
        data: {
          commentsHomeWorkByHomeWork: {
            ...existingComments?.commentsHomeWorkByHomeWork,
            items: updatedComments,
            totalElements:
              parseInt(
                existingComments?.commentsHomeWorkByHomeWork?.totalElements,
                PARSE_INT_RADIX
              ) - INDEX_OFFSET,
          },
        },
      });
    },
  });

  return <DeleteComment {...{ id, deleteComment, loading }} />;
};

export default DeleteCommentContainer;
