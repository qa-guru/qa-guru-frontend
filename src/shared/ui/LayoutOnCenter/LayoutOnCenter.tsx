import React from "react";
import styles from "./LayoutOnCenter.module.scss";
import { ILayoutOnCenter } from "./LayoutOnCenter.types";

const LayoutOnCenter: React.FC<ILayoutOnCenter> = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};

export default LayoutOnCenter;
