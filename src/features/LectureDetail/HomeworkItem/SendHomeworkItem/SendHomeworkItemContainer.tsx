import React from "react";
import SendHomeworkItem from "./SendHomeworkItem";
import { useSendHomeWorkToCheckMutation } from "../../../../api/graphql/homework/sendHomeWorkToCheck";

const SendHomeworkItemContainer: React.FC = () => {
  const [sendHomeWorkToCheck, { loading }] = useSendHomeWorkToCheckMutation();

  return (
    <SendHomeworkItem
      loading={loading}
      sendHomeWorkToCheck={sendHomeWorkToCheck}
    />
  );
};

export default SendHomeworkItemContainer;
