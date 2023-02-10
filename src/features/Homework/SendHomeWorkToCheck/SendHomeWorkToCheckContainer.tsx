import React from "react";
import { useSendHomeWorkToCheckMutation } from "../../../api/graphql/homework/sendHomeWorkToCheck";
import SendHomeWorkToCheck from "./SendHomeWorkToCheck";

const SendHomeWorkToCheckContainer: React.FC = () => {
  const [sendHomeWorkToCheck, { loading }] = useSendHomeWorkToCheckMutation();

  return (
    <SendHomeWorkToCheck
      loading={loading}
      sendHomeWorkToCheck={sendHomeWorkToCheck}
    />
  );
};

export default SendHomeWorkToCheckContainer;
