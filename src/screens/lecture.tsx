import React from "react";
import LectureDetail from "../features/lecture-detail/containers/lecture-detail";
import ButtonLessonsList from "../shared/components/buttons/button-lessons-list/button-lessons-list";

const Lecture: React.FC = () => {
  return (
    <>
      <ButtonLessonsList />
      <LectureDetail />
    </>
  );
};

export default Lecture;
