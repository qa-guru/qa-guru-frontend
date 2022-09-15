import { Typography } from "antd";
import styles from "./LessonTitle.module.scss";

const LessonTitle = () => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.number}>1</span>
      <Typography className={styles.title}>
        Вводное занятие. Сразу к практике
      </Typography>
    </div>
  );
};

export default LessonTitle;
