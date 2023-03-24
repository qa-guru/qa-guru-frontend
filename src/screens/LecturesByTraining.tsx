import React from "react";
import TrainingLectures from "../features/TrainingLectures";
import ButtonTrainingList from "../shared/Buttons/ButtonTrainingList";

const LecturesByTraining: React.FC = () => {
  return (
    <>
      <ButtonTrainingList />
      <TrainingLectures />
    </>
  );
};

export default LecturesByTraining;
