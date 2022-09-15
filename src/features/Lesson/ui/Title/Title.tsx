import { Typography } from "antd";
import styles from "./Title.module.scss";

const Title = () => {
  return (
    <Typography className={styles.wrapper}>
      <Typography className={styles.title}>
        1. Вводное занятие. Сразу к практике!
      </Typography>
      <ul className={styles.list}>
        <li className={styles.list_item}>
          <Typography>
            1. Практика. Пишем первый автотест: Java / Gradle / JUnit5 /
            Selenide.
          </Typography>
        </li>
        <li className={styles.list_item}>
          <Typography>
            2. Изучаем готовый проект с инфраструктурой: Github / Jenkins /
            Allure Report / Allure TestOps / Selenoid / Телеграм-бот
          </Typography>
        </li>
      </ul>
      <Typography className={styles.access}>
        1 из 33 уроков <br /> Доступен
      </Typography>
      <div className={styles.wrapp}>
        <Typography className={styles.descr}>
          Дополнительное занятие. Профессионально работаем с IntelliJ IDEA. Юрий
          Артамонов (JetBrains). Занятие в записи.
        </Typography>
      </div>
    </Typography>
  );
};

export default Title;
