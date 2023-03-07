import React from "react";
import SendComment from "./SendComment";
import { ISendHomeworkContainer } from "./SendComment.types";
import { useSendCommentMutation } from "../../../../../api/graphql/homeworkComment/sendComment";

const SendCommentContainer: React.FC<ISendHomeworkContainer> = ({
  id,
  setComments,
  comments,
}) => {
  const [sendComment, { loading }] = useSendCommentMutation({
    update(cache, { data }) {
      setComments([data?.sendComment, ...comments]);
    },
  });

  return <SendComment loading={loading} sendComment={sendComment} id={id} />;
};

export default SendCommentContainer;
