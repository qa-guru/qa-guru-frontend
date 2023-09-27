import React from "react";
import {
  CommentsHomeWorkByHomeWorkDocument,
  CommentsHomeWorkByHomeWorkQuery,
  useSendCommentMutation,
} from "api/graphql/generated/graphql";
import { ISendCommentContainer } from "./send-comment-container.types";
import SendComment from "../../views/send-comment";

const SendCommentContainer: React.FC<ISendCommentContainer> = (props) => {
  const { id } = props;

  const [sendComment, { loading }] = useSendCommentMutation({
    update: (cache, { data }) => {
      const newComment = data?.sendComment;
      const existingComments: CommentsHomeWorkByHomeWorkQuery | null =
        cache.readQuery({
          query: CommentsHomeWorkByHomeWorkDocument,
          variables: {
            offset: 0,
            limit: 3,
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
          offset: 0,
          limit: 3,
          sort: {
            field: "CREATION_DATE",
            order: "DESC",
          },
          homeWorkId: id,
        },
        data: {
          commentsHomeWorkByHomeWork: {
            ...existingComments!.commentsHomeWorkByHomeWork,
            items: [
              newComment,
              ...existingComments!.commentsHomeWorkByHomeWork!.items!,
            ],
            totalElements:
              parseInt(
                existingComments!.commentsHomeWorkByHomeWork!.totalElements,
                10
              ) + 1,
          },
        },
      });
    },
  });

  return <SendComment loading={loading} sendComment={sendComment} id={id} />;
};

export default SendCommentContainer;
