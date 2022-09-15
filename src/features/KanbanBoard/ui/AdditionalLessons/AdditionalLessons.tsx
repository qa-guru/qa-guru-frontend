import { ReactNode } from "react";
import { Typography } from "antd";
import styles from "./AdditionalLessons.module.scss";

type IAdditionalLessons = {
  children: ReactNode;
};

const AdditionalLessons = ({ children }: IAdditionalLessons) => {
  return (
    <div>
      <Typography className={styles.additional}>Additional lessons</Typography>
      <div className={styles.wrapp}>{children}</div>
    </div>
  );
};

export default AdditionalLessons;
