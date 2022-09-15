import { IFormSubscribing } from "../Subscribing.types";
import styles from "./SubcribingAnyText.module.scss";
import { Typography } from "antd";
const { Text } = Typography;

const SubcribingAnyText: React.FC<IFormSubscribing> = (content) => {
  return <Text className={styles.text}>{content.content}</Text>;
};

export default SubcribingAnyText;
