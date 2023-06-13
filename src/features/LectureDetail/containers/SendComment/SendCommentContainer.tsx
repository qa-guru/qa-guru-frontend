import React from "react";
import { ISendCommentContainer } from "./SendCommentContainer.types";
import SendComment from "../../views/SendComment";
import { useSendCommentMutation } from "../../../../api/graphql/homeworkComment/sendComment";
import {
  CommentsHomeWorkByHomeWorkDocument,
  CommentsHomeWorkByHomeWorkQuery
} from "../../../../api/graphql/generated/graphql";

const SendCommentContainer: React.FC<ISendCommentContainer> = (props) => {
  const { id } = props;

  const [sendComment, { loading }] = useSendCommentMutation({
    update: (cache, { data }) => {
      const newComment = data?.sendComment;
      const existingComments = cache.readQuery<CommentsHomeWorkByHomeWorkQuery>({
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
              ...(existingComments!.commentsHomeWorkByHomeWork!.items || []),
            ],
            totalElements:
              parseInt(
                String(existingComments!.commentsHomeWorkByHomeWork!.totalElements || 0),
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
