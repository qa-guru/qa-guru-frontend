import { FC } from "react";
import { useParams } from "react-router-dom";
import { AppSpinner } from "shared/components/spinners";
import NoDataErrorMessage from "shared/components/no-data-error-message";
import {
  useTrainingLecturesQuery,
  useTrainingQuery,
} from "api/graphql/generated/graphql";

import Stepper from "../../views/stepper/stepper";

const StepperContainer: FC = () => {
  const { trainingId } = useParams();

  const { data: dataTrainingLectures, loading: loadingTrainingLectures } =
    useTrainingLecturesQuery({
      variables: { id: trainingId! },
    });
  const { data: dataTraining, loading: loadingTraining } = useTrainingQuery({
    variables: { id: trainingId! },
  });

  if (loadingTrainingLectures || loadingTraining) return <AppSpinner />;
  if (!dataTrainingLectures || !dataTraining || !trainingId)
    return <NoDataErrorMessage />;

  return (
    <Stepper
      trainingId={trainingId}
      dataTrainingLectures={dataTrainingLectures}
      dataTraining={dataTraining}
    />
  );
};

export default StepperContainer;
