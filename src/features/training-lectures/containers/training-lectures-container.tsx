import { FC } from "react";
import { useParams } from "react-router-dom";
import Spinner from "shared/components/spinner";
import NoDataErrorMessage from "shared/components/no-data-error-message";
import {
  useTrainingLecturesQuery,
  useTrainingQuery,
} from "api/graphql/generated/graphql";
import TrainingLectures from "../views/training-lectures";

const TrainingLecturesContainer: FC = () => {
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
