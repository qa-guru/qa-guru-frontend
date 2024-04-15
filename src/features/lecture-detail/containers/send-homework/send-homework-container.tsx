import { FC } from "react";
import { useSendHomeWorkToCheckMutation } from "api/graphql/generated/graphql";

import SendHomework from "../../views/send-homework";

const SendHomeworkContainer: FC = () => {
  const [sendHomeWorkToCheck, { loading }] = useSendHomeWorkToCheckMutation();

  return <SendHomework {...{ loading, sendHomeWorkToCheck }} />;
};

export default SendHomeworkContainer;
