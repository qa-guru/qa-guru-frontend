import { FC } from "react";
import { useSendHomeWorkToCheckMutation } from "api/graphql/generated/graphql";

import SendHomework from "../view";

const SendHomeworkContainer: FC = () => {
  const [sendHomeWorkToCheck, { loading }] = useSendHomeWorkToCheckMutation();

  return (
    <SendHomework loading={loading} sendHomeWorkToCheck={sendHomeWorkToCheck} />
  );
};

export default SendHomeworkContainer;
