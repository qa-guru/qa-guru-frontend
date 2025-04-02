import { FC } from "react";

import {
  CommentsHomeWorkByHomeWorkDocument,
  CommentsHomeWorkByHomeWorkQuery,
  useSendCommentMutation,
  Maybe,
  useUpdateCommentMutation,
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

  const [sendComment, { loading: loadingSendComment }] = useSendCommentMutation(
    {
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
    }
  );

  const [updateComment, { loading: loadingUpdateComment }] =
    useUpdateCommentMutation({
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
    <SendComment
      sendComment={sendComment}
      updateComment={updateComment}
      loadingUpdateComment={loadingUpdateComment}
      loadingSendComment={loadingSendComment}
      homeworkId={homeworkId}
    />
  );
};

export default SendCommentContainer;
