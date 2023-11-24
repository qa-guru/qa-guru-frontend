import { FC } from "react";
import {
  CommentsHomeWorkByHomeWorkDocument,
  CommentsHomeWorkByHomeWorkQuery,
  useSendCommentMutation,
} from "api/graphql/generated/graphql";
import { ISendCommentContainer } from "./send-comment-container.types";
import SendComment from "../../views/send-comment";
import { INDEX_OFFSET, PARSE_INT_RADIX, QUERY_DEFAULTS } from "../../constants";

const SendCommentContainer: FC<ISendCommentContainer> = (props) => {
  const { id, hideTitile } = props;

  const [sendComment, { loading }] = useSendCommentMutation({
    update: (cache, { data }) => {
      const newComment = data?.sendComment;
      const existingComments: CommentsHomeWorkByHomeWorkQuery | null =
        cache.readQuery({
          query: CommentsHomeWorkByHomeWorkDocument,
          variables: {
            offset: QUERY_DEFAULTS.OFFSET,
            limit: QUERY_DEFAULTS.LIMIT,
            sort: {
              field: "CREATION_DATE",
              order: "DESC",
            },
            homeWorkId: id,
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
          homeWorkId: id,
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
      id={id}
      hideTitile={hideTitile}
    />
  );
};

export default SendCommentContainer;
