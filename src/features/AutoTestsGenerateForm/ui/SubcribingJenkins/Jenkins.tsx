import { Typography, Button } from "antd";
import { IFormSubscribing } from "../Subscribing.types";
import styles from "./Jenkins.module.scss";

const { Text } = Typography;

export const Jenkins: React.FC<IFormSubscribing> = (content) => {
  return (
    <div className={styles.box}>
      <Text className={styles.title}>Jenkins</Text>
      <Button href={content.content} type="link">
        {content.content}
      </Button>
    </div>
  );
};
