import { FC } from "react";

import {
  CommentsHomeWorkByHomeWorkDocument,
  CommentsHomeWorkByHomeWorkQuery,
  useSendCommentMutation,
  Maybe,
} from "api/graphql/generated/graphql";
import {
  INDEX_OFFSET,
  PARSE_INT_RADIX,
  QUERY_DEFAULTS,
} from "shared/constants";

import { ISendCommentContainer } from "./send-comment-container.types";
import SendComment from "../view";

const SendCommentContainer: FC<ISendCommentContainer> = (props) => {
  const { homeworkId } = props;

  const [sendComment, { loading }] = useSendCommentMutation({
    update: (cache, { data }) => {
      const newComment = data?.sendComment;
      const existingComments: Maybe<CommentsHomeWorkByHomeWorkQuery> =
        cache.readQuery({
          query: CommentsHomeWorkByHomeWorkDocument,
          variables: {
            offset: QUERY_DEFAULTS.OFFSET,
            limit: QUERY_DEFAULTS.LIMIT,
            sort: {
              field: "CREATION_DATE",
              order: "DESC",
            },
            homeWorkId: homeworkId,
          },
        });

      cache.writeQuery({
        query: CommentsHomeWorkByHomeWorkDocument,
        variables: {
          offset: QUERY_DEFAULTS.OFFSET,
          limit: QUERY_DEFAULTS.LIMIT,
          sort: {
            field: "CREATION_DATE",
            order: "DESC",
          },
          homeWorkId: homeworkId,
        },
        data: {
          commentsHomeWorkByHomeWork: {
            ...existingComments?.commentsHomeWorkByHomeWork,
            items: [
              newComment,
              ...(existingComments?.commentsHomeWorkByHomeWork?.items || []),
            ],
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
    <SendComment
      loading={loading}
      sendComment={sendComment}
      homeworkId={homeworkId}
    />
  );
};

export default SendCommentContainer;
