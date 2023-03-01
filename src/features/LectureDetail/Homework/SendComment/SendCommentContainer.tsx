import React from "react";
import SendComment from "./SendComment";
import { ISendHomeworkContainer } from "./SendComment.types";
import { useSendCommentMutation } from "../../../../api/graphql/homeworkComment/sendComment";

const SendHomeworkContainer: React.FC<ISendHomeworkContainer> = ({
  setAddComment,
  id,
}) => {
  const [sendComment, { loading }] = useSendCommentMutation();

  return (
    <SendComment
      loading={loading}
      sendComment={sendComment}
      setAddComment={setAddComment}
      id={id}
    />
  );
};

export default SendHomeworkContainer;
