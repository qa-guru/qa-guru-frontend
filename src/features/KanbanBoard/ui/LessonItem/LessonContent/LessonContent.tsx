import { Typography } from "antd";
import styles from "./LessonContent.module.scss";
import React from "react";
import { ILessonContent } from "./LessonContent.types";

const LessonContent: React.FC<ILessonContent> = ({ description }) => {
  return (
    <ul className={styles.list}>
      <li>
        <Typography>{description}</Typography>
        {/*<Typography className={styles.list_subtitle}>{description}</Typography>*/}
      </li>
    </ul>
  );
};

export default LessonContent;
