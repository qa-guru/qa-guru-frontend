import {
  CommentHomeWorkSortField,
  CommentsHomeWorkByHomeWorkDocument,
  CommentsHomeWorkByHomeWorkQuery,
  Maybe,
  Order,
  useAnswerCommentMutation,
  useUserQuery,
} from "api/graphql/generated/graphql";
import { FC } from "react";

import { IAnswerCommentContainer } from "./answer-comment-container.types";
import AnswerComment from "../../views/answer-comment";
import { INDEX_OFFSET, PARSE_INT_RADIX, QUERY_DEFAULTS } from "../../constants";

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

      const updatedComments =
        existingComments?.commentsHomeWorkByHomeWork?.items?.map((item) => {
          if (item?.id === commentId) {
            return {
              ...item,
              children: item?.children
                ? [...item.children, newAnswerComment]
                : [newAnswerComment],
            };
          }
          return item;
        });

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

  const answerCommentProps = {
    loading,
    answerComment,
    commentId,
    onReplySuccess,
  };

  return <AnswerComment {...answerCommentProps} dataUser={data} />;
};

export default AnswerCommentContainer;
