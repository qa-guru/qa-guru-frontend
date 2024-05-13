import { useTrainingLecturesQuery } from "api/graphql/generated/graphql";
import { FC } from "react";
import { useParams } from "react-router-dom";

import Stepper from "../../views/stepper";

const TrainingLecturesContainer: FC = () => {
  const { trainingId } = useParams();
  const { data: dataTrainingLectures } = useTrainingLecturesQuery({
    variables: { id: trainingId! },
  });

  return <Stepper dataTrainingLectures={dataTrainingLectures} />;
};

export default TrainingLecturesContainer;
