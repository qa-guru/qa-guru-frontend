import React from "react";
import TrainingLectures from "../features/TrainingLectures/containers";
import ButtonTrainingList from "../shared/components/Buttons/ButtonTrainingList/ButtonTrainingList";

const LecturesByTraining: React.FC = () => {
  return (
    <>
      <ButtonTrainingList />
      <TrainingLectures />
    </>
  );
};

export default LecturesByTraining;
