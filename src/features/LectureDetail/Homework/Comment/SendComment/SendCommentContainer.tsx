import React, { useState } from "react";
import SendComment from "./SendComment";
import { ISendHomeworkContainer } from "./SendComment.types";
import { useSendCommentMutation } from "../../../../../api/graphql/homeworkComment/sendComment";

const SendCommentContainer: React.FC<ISendHomeworkContainer> = ({
  id,
  setComments,
}) => {
  const [sendComment, { loading }] = useSendCommentMutation({
    update(cache, { data }) {
      const newComment = data?.sendComment;
      const numNewComments = 1;

      setComments((prevComments) => {
        const numToDelete = Math.min(numNewComments, prevComments.length);
        return [
          newComment,
          ...prevComments.slice(0, prevComments.length - numToDelete),
        ];
      });
    },
  });

  return <SendComment loading={loading} sendComment={sendComment} id={id} />;
};

export default SendCommentContainer;
