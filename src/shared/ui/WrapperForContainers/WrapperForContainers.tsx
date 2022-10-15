import React from "react";
import styles from "./WrapperForContainers.module.scss";
import { IWrapperForContainers } from "./WrapperForContainers.types";

const WrapperForContainers: React.FC<IWrapperForContainers> = ({
  children,
}) => {
  return <div className={styles.wrapper}>{children}</div>;
};

export default WrapperForContainers;
