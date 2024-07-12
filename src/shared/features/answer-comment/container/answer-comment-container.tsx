import { FC } from "react";
import {
  CommentHomeWorkDto,
  CommentHomeWorkSortField,
  CommentsHomeWorkByHomeWorkDocument,
  CommentsHomeWorkByHomeWorkQuery,
  Maybe,
  Order,
  useAnswerCommentMutation,
  useUserQuery,
} from "api/graphql/generated/graphql";
import {
  QUERY_DEFAULTS,
  INDEX_OFFSET,
  PARSE_INT_RADIX,
} from "shared/constants";

import { IAnswerCommentContainer } from "./answer-comment-container.types";
import AnswerComment from "../view";

const AnswerCommentContainer: FC<IAnswerCommentContainer> = (props) => {
  const { commentId, onReplySuccess, homeworkId } = props;
  const { data } = useUserQuery();

  const [answerComment, { loading }] = useAnswerCommentMutation({
    update: (cache, { data }) => {
      const newAnswerComment = data?.answerComment;

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

      const updateNestedComments = (
        comments: Maybe<CommentHomeWorkDto>[],
        parentId: string
      ): Maybe<CommentHomeWorkDto[]> => {
        return comments?.map((item) => {
          if (item?.id === parentId) {
            return {
              ...item,
              children: item?.children
                ? [...item.children, newAnswerComment]
                : [newAnswerComment],
            };
          }

          if (item?.children) {
            return {
              ...item,
              children: updateNestedComments(item.children, parentId),
            };
          }

          return item;
        }) as Maybe<CommentHomeWorkDto[]>;
      };

      const updatedComments = updateNestedComments(
        existingComments?.commentsHomeWorkByHomeWork?.items!,
        commentId!
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
              ) + INDEX_OFFSET,
          },
        },
      });
    },
  });

  return (
    <AnswerComment
      loading={loading}
      answerComment={answerComment}
      commentId={commentId}
      dataUser={data}
      onReplySuccess={onReplySuccess}
    />
  );
};

export default AnswerCommentContainer;
