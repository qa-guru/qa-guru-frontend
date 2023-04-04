import React from "react";
import SendComment from "./SendComment";
import { ISendHomeworkContainer } from "./SendComment.types";
import { useSendCommentMutation } from "../../../../api/graphql/homeworkComment/sendComment";
import { CommentsHomeWorkByHomeWorkDocument } from "../../../../api/graphql/generated/graphql";

const SendCommentContainer: React.FC<ISendHomeworkContainer> = (props) => {
  const { id } = props;

  const [sendComment, { loading }] = useSendCommentMutation({
    update: (cache, { data }) => {
      const newComment = data?.sendComment;
      const { commentsHomeWorkByHomeWork }: any = cache.readQuery({
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
            ...commentsHomeWorkByHomeWork,
            items: [newComment, ...commentsHomeWorkByHomeWork.items],
            totalElements:
              parseInt(commentsHomeWorkByHomeWork.totalElements, 10) + 1,
          },
        },
      });
    },
  });

  return <SendComment loading={loading} sendComment={sendComment} id={id} />;
};

export default SendCommentContainer;
