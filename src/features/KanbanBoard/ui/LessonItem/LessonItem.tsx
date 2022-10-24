import Lectors from "./Lectors/Lectors";
import LessonTitle from "./LessonTitle/LessonTitle";
import LessonContent from "./LessonContent/LessonContent";
import React from "react";
import styles from "./LessonItem.module.scss";
import { ILessonItem } from "./LessonItem.types";

const LessonItem: React.FC<ILessonItem> = ({ subject, description }) => {
  return (
    <div className={styles.wrapper}>
      <LessonTitle subject={subject} />
      <LessonContent description={description} />
      <Lectors />
    </div>
  );
};

export default LessonItem;
