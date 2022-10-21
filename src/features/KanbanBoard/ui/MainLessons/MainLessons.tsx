import { Typography } from "antd";
import React from "react";
import styles from "./MainLessons.module.scss";
import { IMainLessons } from "./MainLessons.types";

const MainLessons: React.FC<IMainLessons> = ({ children }) => {
  return (
    <div>
      <Typography className={styles.main}>Main lessons</Typography>
      <div className={styles.wrapp}>{children}</div>
    </div>
  );
};

export default MainLessons;
