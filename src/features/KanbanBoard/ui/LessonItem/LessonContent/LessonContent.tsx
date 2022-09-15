import { Typography } from "antd";
import styles from "./LessonContent.module.scss";

const LessonContent = () => {
  return (
    <ul className={styles.list}>
      <li>
        <Typography>Разрабатываем и запускаем первый автотест</Typography>
        <Typography className={styles.list_subtitle}>
          Java / Gradle / JUnit5 / Selenide
        </Typography>
      </li>
      <li>
        <Typography>Разрабатываем и запускаем первый автотест</Typography>
        <Typography className={styles.list_subtitle}>
          Java / Gradle / JUnit5 / Selenide
        </Typography>
      </li>
    </ul>
  );
};

export default LessonContent;
