import React from "react";
import TrainingLectures from "features/training-lectures/containers";
import ButtonTrainingList from "shared/components/buttons/button-training-list/button-training-list";

const LecturesByTraining: React.FC = () => {
  return (
    <>
      <ButtonTrainingList />
      <TrainingLectures />
    </>
  );
};

export default LecturesByTraining;
