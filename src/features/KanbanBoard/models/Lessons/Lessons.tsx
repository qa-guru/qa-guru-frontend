import { Typography } from "antd";
import LessonItem from "../../ui/LessonItem/LessonItem";
import AdditionalLessons from "../../ui/AdditionalLessons/AdditionalLessons";
import MainLessons from "../../ui/MainLessons/MainLessons";
import styles from "./Lessons.module.scss";
import { useLecturesQuery } from "../../../../api/query/lectures";
import React from "react";
import Spinner from "../../../../shared/ui/Spinner/Spinner";

const Lessons = () => {
  const { data, loading } = useLecturesQuery();

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Typography className={styles.title}>Lessons</Typography>
      <div className={styles.wrapp}>
        <Typography className={styles.main}>Main lessons</Typography>
        <Typography className={styles.additional}>
          Additional lessons
        </Typography>
      </div>
      <div className={styles.wrapper}>
        {data?.lectures?.items?.map((lecture) => {
          return (
            <>
              <AdditionalLessons>
                {/*<LessonItem*/}
                {/*  key={lecture?.id}*/}
                {/*  subject={lecture?.subject}*/}
                {/*  description={lecture?.description}*/}
                {/*/>*/}
              </AdditionalLessons>
              <MainLessons>
                <LessonItem
                  key={lecture?.id}
                  subject={lecture?.subject}
                  description={lecture?.description}
                />
              </MainLessons>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Lessons;
