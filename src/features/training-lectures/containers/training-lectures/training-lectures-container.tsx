import { FC } from "react";
import { useParams } from "react-router-dom";

import { AppSpinner } from "shared/components/spinners";
import NoDataErrorMessage from "shared/components/no-data-error-message";
import CatalogMissing from "shared/components/catalog-missing";
import {
  useTrainingLecturesQuery,
  useTrainingQuery,
} from "api/graphql/generated/graphql";
import { FETCH_POLICY } from "shared/constants";
import { isTrainingEntityMissing } from "shared/helpers";

import TrainingLectures from "../../views/training-lectures";

const TrainingLecturesContainer: FC = () => {
  const { trainingId } = useParams();

  const { data: dataTrainingLectures, loading: loadingTrainingLectures } =
    useTrainingLecturesQuery({
      variables: { id: trainingId! },
      fetchPolicy: FETCH_POLICY.CACHE_AND_NETWORK,
    });
  const {
    data: dataTraining,
    loading: loadingTraining,
    error: trainingError,
  } = useTrainingQuery({
    variables: { id: trainingId! },
    fetchPolicy: FETCH_POLICY.CACHE_AND_NETWORK,
    errorPolicy: "all",
  });

  if (loadingTrainingLectures || loadingTraining) return <AppSpinner />;
  if (isTrainingEntityMissing(dataTraining?.training, trainingError)) {
    return <CatalogMissing kind="training" />;
  }
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
