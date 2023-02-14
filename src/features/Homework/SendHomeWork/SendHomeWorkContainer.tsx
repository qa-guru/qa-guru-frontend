import React from "react";
import { useSendHomeWorkToCheckMutation } from "../../../api/graphql/homework/sendHomeWorkToCheck";
import SendHomeWork from "./SendHomeWork";

const SendHomeWorkContainer: React.FC = () => {
  const [sendHomeWorkToCheck, { loading }] = useSendHomeWorkToCheckMutation();

  return (
    <SendHomeWork loading={loading} sendHomeWorkToCheck={sendHomeWorkToCheck} />
  );
};

export default SendHomeWorkContainer;
