import { ContainerProps } from "../Container.types";
import styles from "./ConteinerRight.module.scss";

const ContainerRight = ({ children }: ContainerProps) => {
  return <div className={styles.content__right}>{children}</div>;
};

export default ContainerRight;
