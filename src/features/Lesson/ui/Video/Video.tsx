import { Typography } from "antd";
import ReactPlayer from "react-player";
import styles from "./Video.module.scss";

const Video = () => {
  return (
    <div>
      <Typography className={styles.title}>
        Запись вводного занятия (Тайм-коды на YouTube)
      </Typography>
      {/* <ReactPlayer
        className={styles.video}
        controls={true}
        url="https://www.youtube.com/watch?v=xk52UlNhuVk&t=1s"
      /> */}
    </div>
  );
};

export default Video;
