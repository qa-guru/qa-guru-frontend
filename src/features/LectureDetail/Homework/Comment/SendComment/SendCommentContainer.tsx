import React, { useState } from "react";
import SendComment from "./SendComment";
import { ISendHomeworkContainer } from "./SendComment.types";
import { useSendCommentMutation } from "../../../../../api/graphql/homeworkComment/sendComment";

const SendCommentContainer: React.FC<ISendHomeworkContainer> = (props) => {
  const { id, setComments, totalElements } = props;

  const [sendComment, { loading }] = useSendCommentMutation({
    update(cache, { data }) {
      const newComment = data?.sendComment;
      let numNewComments: number;

      if (totalElements > 1) {
        numNewComments = 1;
      } else {
        numNewComments = 0;
      }

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
