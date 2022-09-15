import styles from "./LessonItem.module.scss";
import Lectors from "./Lectors/Lectors";
import LessonTitle from "./LessonTitle/LessonTitle";
import LessonContent from "./LessonContent/LessonContent";

const LessonItem = () => {
  return (
    <div className={styles.wrapper}>
      <LessonTitle />
      <LessonContent />
      <Lectors />
    </div>
  );
};

export default LessonItem;
