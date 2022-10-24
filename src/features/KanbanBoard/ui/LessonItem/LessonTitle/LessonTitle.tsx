import { Typography } from "antd";
import styles from "./LessonTitle.module.scss";
import React from "react";
import { ILessonTitle } from "./LessonTilte.types";

const LessonTitle: React.FC<ILessonTitle> = ({ subject }) => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.number}>1</span>
      <Typography className={styles.title}>{subject}</Typography>
    </div>
  );
};

export default LessonTitle;
