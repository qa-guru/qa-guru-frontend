import { ContainerProps } from "../Container.types";
import styles from "./ContainerLeft.module.scss";

const ContainerLeft = ({ children }: ContainerProps) => {
  return <div className={styles.content__left}>{children}</div>;
};

export default ContainerLeft;
