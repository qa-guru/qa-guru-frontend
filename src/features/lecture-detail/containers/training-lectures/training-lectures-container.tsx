import { useTrainingLecturesQuery } from "api/graphql/generated/graphql";
import { FC } from "react";
import { useParams } from "react-router-dom";
import { FETCH_POLICY } from "shared/constants";

import Stepper from "../../views/stepper";

const TrainingLecturesContainer: FC = () => {
  const { trainingId } = useParams();
  const { data: dataTrainingLectures } = useTrainingLecturesQuery({
    variables: { id: trainingId! },
    fetchPolicy: FETCH_POLICY,
  });

  return <Stepper dataTrainingLectures={dataTrainingLectures} />;
};

export default TrainingLecturesContainer;
