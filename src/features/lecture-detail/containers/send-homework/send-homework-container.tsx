import React from "react";
import { useSendHomeWorkToCheckMutation } from "api/graphql/generated/graphql";
import SendHomework from "../../../../shared/components/homework-item/homework-content/send-homework";

const SendHomeworkContainer: React.FC = () => {
  const [sendHomeWorkToCheck, { loading }] = useSendHomeWorkToCheckMutation();

  return (
    <SendHomework loading={loading} sendHomeWorkToCheck={sendHomeWorkToCheck} />
  );
};

export default SendHomeworkContainer;
