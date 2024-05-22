import { useUpdateTrainingMutation } from "api/graphql/generated/graphql";
import { FC } from "react";
import { AppSpinner } from "shared/components/spinners";

import CreateTraining from "../../views/create-training";

const CreateTrainingContainer: FC = () => {
  const [updateTraining, { loading }] = useUpdateTrainingMutation();

  if (loading) return <AppSpinner />;

  return <CreateTraining updateTraining={updateTraining} />;
};

export default CreateTrainingContainer;
