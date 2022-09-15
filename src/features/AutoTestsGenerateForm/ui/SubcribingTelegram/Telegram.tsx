import { IFormSubscribing } from "../Subscribing.types";
import styles from "./Telegram.module.scss";
import { Typography } from "antd";
import FadeIn from "react-fade-in";

const { Text } = Typography;

export const Telegram: React.FC<IFormSubscribing> = (content) => {
  return (
    <FadeIn>
      <div className={styles.box}>
        <Text className={styles.title}>Telegram Notification</Text>
      </div>
      <iframe
        className={styles.iframe}
        src={`https://t.me/${content.content}?embed=1&discussion=1&comments_limit=5&dark=1`}
      ></iframe>
    </FadeIn>
  );
};
