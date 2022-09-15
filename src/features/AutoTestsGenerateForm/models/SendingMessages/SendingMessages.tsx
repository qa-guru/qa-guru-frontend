import { Button } from "antd";
import { useContext, useEffect, useState } from "react";
import { useStompClient } from "react-stomp-hooks";
import { ISendingMessages } from "./SendingMessages.types";
import dataSerialize from "../../lib/dataSerialize";
import styles from "./SendingMessages.module.scss";
import { uuid } from "../../lib/stringUtils";
import { CountManualTestContext } from "../../context/CountManualTestProvider";

export const SendingMessages: React.FC<ISendingMessages> = ({ data }) => {
  // const stompClient = useStompClient();

  const [visible, setVisible] = useState<boolean>(false);

  const [countManualTest, setCountManualTest] = useContext(
    CountManualTestContext
  );

  // useEffect(() => {
  //   setVisible(!visible);
  //   if (stompClient && data) {
  //     console.log(dataSerialize(data, countManualTest));
  //     stompClient.publish({
  //       destination: `/app/generate/${uuid}`,
  //       body: dataSerialize(data, countManualTest),
  //     });
  //   }
  // }, [data]);

  return (
    <>
      {visible ? (
        <Button className={styles.button} htmlType="submit">
          Generate
        </Button>
      ) : null}
    </>
  );
};
