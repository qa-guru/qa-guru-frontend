import React from "react";
import { useParams } from "react-router-dom";
import TrainingLectures from "./TrainingLectures";
import { useTrainingLecturesQuery } from "../../api/graphql/trainingLecture/trainingLectures";
import Spinner from "../../shared/Spinner";
import NoDataErrorMessage from "../../shared/NoDataErrorMessage";
import { useTrainingQuery } from "../../api/graphql/training/training";

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
