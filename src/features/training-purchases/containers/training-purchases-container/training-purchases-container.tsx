import { FC } from "react";
import AppSpinner from "shared/components/spinners/app-spinner";
import NoDataErrorMessage from "shared/components/no-data-error-message";
import { useTrainingPurchasesQuery } from "api/graphql/generated/graphql";

import TrainingPurchases from "../../views/training-purchases";

const TrainingPurchasesContainer: FC = () => {
  const { data, loading } = useTrainingPurchasesQuery();

  if (loading) return <AppSpinner />;
  if (!data) return <NoDataErrorMessage />;

  return <TrainingPurchases data={data} />;
};

export default TrainingPurchasesContainer;
