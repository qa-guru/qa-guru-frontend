import React, { useEffect } from "react";
import { IGetHomework } from "./GetHomework.types";
import { useLazyQuery } from "@apollo/client";
import { LectureHomeWorkByIdDocument } from "../../../../generated/graphql";
import styles from "./GetHomework.module.scss";
import LayoutOnCenter from "../../../../shared/ui/LayoutOnCenter/LayoutOnCenter";
import { Typography } from "antd";

const GetHomework: React.FC<IGetHomework> = ({ idHomework }) => {
  const [lectureHomeWork, { data }] = useLazyQuery(LectureHomeWorkByIdDocument);

  useEffect(() => {
    lectureHomeWork({
      variables: { id: idHomework },
    });
  }, [idHomework]);

  return (
    <LayoutOnCenter>
      <Typography className={styles.title}>
        {data?.lectureHomeWork && data.lectureHomeWork.subject}
      </Typography>
      <Typography className={styles.subtitle}>
        {data?.lectureHomeWork && data.lectureHomeWork.description}
      </Typography>
    </LayoutOnCenter>
  );
};
export default GetHomework;
