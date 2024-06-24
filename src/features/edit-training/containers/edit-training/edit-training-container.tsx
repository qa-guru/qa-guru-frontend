import {
  useTrainingQuery,
  useUpdateTrainingMutation,
} from "api/graphql/generated/graphql";
import { FC } from "react";
import NoDataErrorMessage from "shared/components/no-data-error-message";
import { AppSpinner } from "shared/components/spinners";
import { useParams } from "react-router-dom";

import EditTraining from "../../views/edit-training";

const EditTrainingContainer: FC = () => {
  const { trainingId } = useParams();

  const { data, loading: loadingTraining } = useTrainingQuery({
    variables: { id: trainingId! },
  });

  const [updateTraining, { loading: loadingUpdateTraining }] =
    useUpdateTrainingMutation();

  if (loadingTraining || loadingUpdateTraining) return <AppSpinner />;
  if (!data) return <NoDataErrorMessage />;

  return <EditTraining data={data} updateTraining={updateTraining} />;
};

export default EditTrainingContainer;
