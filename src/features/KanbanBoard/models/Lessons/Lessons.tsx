import { Typography } from "antd";
import LessonItem from "../../ui/LessonItem/LessonItem";
import AdditionalLessons from "../../ui/AdditionalLessons/AdditionalLessons";
import MainLessons from "../../ui/MainLessons/MainLessons";
import styles from "./Lessons.module.scss";

const Lessons = () => {
  return (
    <>
      <Typography className={styles.title}>Lessons</Typography>
      <div className={styles.wrapper}>
        <AdditionalLessons>
          <LessonItem />
          <LessonItem />
          <LessonItem />
        </AdditionalLessons>
        <MainLessons>
          <LessonItem />
          <LessonItem />
          <LessonItem />
        </MainLessons>
      </div>
    </>
  );
};

export default Lessons;
