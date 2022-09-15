import { Typography } from "antd";
import styles from "./LessonLinks.module.scss";

const { Link } = Typography;

const LessonLinks = () => {
  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        <li>
          <Link
            className={styles.link}
            href="https://www.canva.com/ru_ru/restricted/?utm_content=DAEx9RLXYeM&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"
          >
            Презентация
          </Link>
        </li>
        <li>
          <Typography className={styles.title}>
            Инструкция по настройке рабочей среды:
          </Typography>
          <Link
            className={styles.link}
            href="https://github.com/SmallSparkle/m2.ru_test_project"
          >
            https://github.com/SmallSparkle/m2.ru_test_project
          </Link>
          <Link
            className={styles.link}
            href="https://github.com/4erep/WebShop_final_project/"
          >
            https://github.com/4erep/WebShop_final_project/
          </Link>
          <Link
            className={styles.link}
            href="https://github.com/daramirra/qaGuruDiploma"
          >
            https://github.com/daramirra/qaGuruDiploma
          </Link>
          <Link
            className={styles.link}
            href="https://github.com/ElenaSkorobodilova"
          >
            https://github.com/ElenaSkorobodilova
          </Link>
        </li>
        <li>
          <Typography className={styles.title}>
            Уведомления в мессенджеры о прохождении автотестов
          </Typography>
          <Link
            className={styles.link}
            href="https://github.com/qa-guru/allure-notifications"
          >
            https://github.com/qa-guru/allure-notifications
          </Link>
        </li>
        <li>
          <Typography className={styles.title}>
            Как оплатить курс? Нужна помощь с домашним заданием? Пишите
          </Typography>
          <Link
            className={styles.link}
            href="https://github.com/qa-guru/allure-notifications"
          >
            https://github.com/qa-guru/allure-notifications
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default LessonLinks;
