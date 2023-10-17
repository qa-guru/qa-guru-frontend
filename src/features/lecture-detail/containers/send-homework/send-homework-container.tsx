import { FC } from "react";
import { useSendHomeWorkToCheckMutation } from "api/graphql/generated/graphql";
import SendHomework from "../../views/homework-item/homework-content/send-homework";

const SendHomeworkContainer: FC = () => {
  const [sendHomeWorkToCheck, { loading }] = useSendHomeWorkToCheckMutation();

  return (
    <SendHomework loading={loading} sendHomeWorkToCheck={sendHomeWorkToCheck} />
  );
};

export default SendHomeworkContainer;
