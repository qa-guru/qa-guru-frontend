import React, { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import LayoutOnCenter from "../../../../shared/ui/LayoutOnCenter/LayoutOnCenter";
import { LectureByIdDocument } from "../../../../generated/graphql";
import { IGetLecture } from "./GetLecture.types";
import { Typography } from "antd";
import styles from "./GetLecture.module.scss";

const GetLecture: React.FC<IGetLecture> = ({ idLecture }) => {
  const [lecture, { data }] = useLazyQuery(LectureByIdDocument);

  useEffect(() => {
    lecture({
      variables: { id: idLecture },
    });
  }, [idLecture]);

  return (
    <LayoutOnCenter>
      <Typography className={styles.title}>
        {data?.lecture && data.lecture.subject}
      </Typography>
      <Typography className={styles.subtitle}>
        {data?.lecture && data.lecture.description}
      </Typography>
    </LayoutOnCenter>
  );
};
export default GetLecture;
