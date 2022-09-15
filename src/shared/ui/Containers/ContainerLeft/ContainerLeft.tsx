import { Content } from "antd/lib/layout/layout";
import { ContainerProps } from "../Container.types";
import styles from "./ContainerLeft.module.scss";

const ContainerLeft = ({ children }: ContainerProps) => {
  return (
    <div className={styles.content__left}>
      <Content className={styles.content__left_container}>{children}</Content>
    </div>
  );
};

export default ContainerLeft;
