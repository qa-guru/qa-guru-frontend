import React, { useState } from "react";
import SendComment from "./SendComment";
import { ISendHomeworkContainer } from "./SendComment.types";
import { useSendCommentMutation } from "../../../../../api/graphql/homeworkComment/sendComment";

const SendCommentContainer: React.FC<ISendHomeworkContainer> = (props) => {
  const { id, setComments } = props;

  const [sendComment, { loading }] = useSendCommentMutation({
    update(cache, { data }) {
      const newComment = data?.sendComment;
      setComments((prevComments) => {
        return [newComment, ...prevComments];
      });
    },
  });

  return <SendComment loading={loading} sendComment={sendComment} id={id} />;
};

export default SendCommentContainer;
