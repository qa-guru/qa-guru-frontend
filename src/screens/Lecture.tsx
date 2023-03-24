import React from "react";
import LectureDetail from "../features/LectureDetail";
import ButtonLessonsList from "../shared/Buttons/ButtonLessonsList";

const Lecture: React.FC = () => {
  return (
    <>
      <ButtonLessonsList />
      <LectureDetail />
    </>
  );
};

export default Lecture;
