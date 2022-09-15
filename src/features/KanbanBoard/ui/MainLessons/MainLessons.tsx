import { Typography } from "antd";
import React from "react";
import styles from "./MainLessons.module.scss";

const MainLessons: React.FC = ({ children }) => {
  return (
    <div>
      <Typography className={styles.main}>Main lessons</Typography>
      <div className={styles.wrapp}>{children}</div>
    </div>
  );
};

export default MainLessons;
