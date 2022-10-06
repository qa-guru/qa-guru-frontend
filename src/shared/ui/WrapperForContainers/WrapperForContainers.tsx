import React from "react";
import styles from "./WrapperForContainers.module.scss";

const WrapperForContainers: React.FC = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};

export default WrapperForContainers;
