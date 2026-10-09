import { FC } from "react";

import useSendHomeworkComment from "../use-send-homework-comment";
import { ISendCommentContainer } from "./send-comment-container.types";
import SendComment from "../view";

const SendCommentContainer: FC<ISendCommentContainer> = (props) => {
  const { homeworkId } = props;

  const { submit, loading } = useSendHomeworkComment(homeworkId);

  return (
    <SendComment key={homeworkId} submitComment={submit} loading={loading} />
  );
};

export default SendCommentContainer;
