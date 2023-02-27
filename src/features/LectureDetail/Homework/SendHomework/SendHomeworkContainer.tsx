import React from "react";
import SendHomework from "./SendHomework";
import { useSendHomeWorkToCheckMutation } from "../../../../api/graphql/homework/sendHomeWorkToCheck";

const SendHomeworkContainer: React.FC = () => {
  const [sendHomeWorkToCheck, { loading }] = useSendHomeWorkToCheckMutation();

  return (
    <SendHomework loading={loading} sendHomeWorkToCheck={sendHomeWorkToCheck} />
  );
};

export default SendHomeworkContainer;
