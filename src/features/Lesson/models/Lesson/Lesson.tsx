import { Typography } from "antd";
import LessonFile from "../../ui/LessonFile/LessonFile";
import LessonForm from "../../ui/LessonForm/LessonForm";
import LessonLinks from "../../ui/LessonLinks/LessonLinks";
import Title from "../../ui/Title/Title";
import Video from "../../ui/Video/Video";
import styles from "./Lesson.module.scss";

const Lesson = () => {
  return (
    <>
      <Typography className={styles.title}>
        QA.GURU | Java | Автоматизация тестирования 14 поток
      </Typography>
      <Title />
      <Video />
      <LessonFile />
      <LessonLinks />
      <LessonForm />
    </>
  );
};

export default Lesson;
