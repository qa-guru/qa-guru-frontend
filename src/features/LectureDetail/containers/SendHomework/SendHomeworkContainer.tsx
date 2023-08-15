import React from "react";
import SendHomework from "../../views/HomeworkItem/HomeworkContent/SendHomework";
import { useSendHomeWorkToCheckMutation } from "../../../../api/graphql/generated/graphql";

const SendHomeworkContainer: React.FC = () => {
  const [sendHomeWorkToCheck, { loading }] = useSendHomeWorkToCheckMutation();

  return (
    <SendHomework loading={loading} sendHomeWorkToCheck={sendHomeWorkToCheck} />
  );
};

export default SendHomeworkContainer;
