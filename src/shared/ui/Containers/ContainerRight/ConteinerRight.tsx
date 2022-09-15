import { Content } from "antd/lib/layout/layout";
import { ContainerProps } from "../Container.types";
import styles from "./ConteinerRight.module.scss";

const ContainerRight = ({ children }: ContainerProps) => {
  return (
    <div className={styles.content__right}>
      <Content>{children}</Content>
    </div>
  );
};

export default ContainerRight;
