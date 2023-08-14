import React from "react";
import { useParams } from "react-router-dom";
import TrainingLectures from "../views/TrainingLectures";
import Spinner from "../../../shared/components/Spinner";
import NoDataErrorMessage from "../../../shared/components/NoDataErrorMessage";
import {
  useTrainingLecturesQuery,
  useTrainingQuery,
} from "../../../api/graphql/generated/graphql";

const TrainingLecturesContainer: React.FC = () => {
  const { trainingId } = useParams();
  const { data: dataTrainingLectures, loading: loadingTrainingLectures } =
    useTrainingLecturesQuery({
      variables: { id: trainingId! },
    });
  const { data: dataTraining, loading: loadingTraining } = useTrainingQuery({
    variables: { id: trainingId! },
  });

  if (loadingTrainingLectures || loadingTraining) return <Spinner />;
  if (!dataTrainingLectures || !dataTraining) return <NoDataErrorMessage />;

  return (
    <TrainingLectures
      trainingId={trainingId!}
      dataTrainingLectures={dataTrainingLectures}
      dataTraining={dataTraining}
    />
  );
};

export default TrainingLecturesContainer;
