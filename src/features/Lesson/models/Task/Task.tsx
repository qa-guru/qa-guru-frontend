import { Typography } from "antd";
import styles from "./Task.module.scss";
import { Image } from "antd";
// import { Homework } from "../../../../assets";

const { Link } = Typography;

const Task = () => {
  return (
    <div>
      <Typography className={styles.title}>Задание</Typography>
      <ol>
        <li>
          <Typography>
            Установите необходимый инструментарий по инструкции
          </Typography>
          <Link href="https://github.com/qa-guru/getting-started-java">
            https://github.com/qa-guru/getting-started-java
          </Link>
        </li>
        <li>
          <Typography>Скопируйте код из репозитория</Typography>
          <Link href="https://github.com/qa-guru/getting-started-java">
            https://github.com/qa-guru/getting-started-java
          </Link>
        </li>
        <li>
          <Typography>Скопируйте код из репозитория</Typography>
        </li>
      </ol>
      <Typography>
        В поле ответа необходимо приложить скриншот пройденного автотеста.
      </Typography>
      <Typography>Пример</Typography>
      {/*<Image className={styles.image} src={Homework} />*/}
    </div>
  );
};

export default Task;
