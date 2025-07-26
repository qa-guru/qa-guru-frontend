import { FC } from "react";
import { useParams } from "react-router-dom";

import { AppSpinner } from "shared/components/spinners";
import NoDataErrorMessage from "shared/components/no-data-error-message";
import {
  useTrainingLecturesQuery,
  useTrainingQuery,
} from "api/graphql/generated/graphql";
import { FETCH_POLICY } from "shared/constants";

import TrainingLectures from "../../views/training-lectures";

const TrainingLecturesContainer: FC = () => {
  const { trainingId } = useParams();

  const { data: dataTrainingLectures, loading: loadingTrainingLectures } =
    useTrainingLecturesQuery({
      variables: { id: trainingId! },
      fetchPolicy: FETCH_POLICY.CACHE_AND_NETWORK,
    });
  const { data: dataTraining, loading: loadingTraining } = useTrainingQuery({
    variables: { id: trainingId! },
    fetchPolicy: FETCH_POLICY.CACHE_AND_NETWORK,
  });

  if (loadingTrainingLectures || loadingTraining) return <AppSpinner />;
  if (!dataTrainingLectures || !dataTraining || !trainingId)
    return <NoDataErrorMessage />;

  return (
    <TrainingLectures
      trainingId={trainingId}
      dataTrainingLectures={dataTrainingLectures}
      dataTraining={dataTraining}
    />
  );
};

export default TrainingLecturesContainer;
