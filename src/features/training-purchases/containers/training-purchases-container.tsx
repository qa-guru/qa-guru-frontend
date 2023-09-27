import React from "react";
import Spinner from "shared/components/spinner";
import NoDataErrorMessage from "shared/components/no-data-error-message";
import { useTrainingPurchasesQuery } from "api/graphql/generated/graphql";
import TrainingPurchases from "../views/training-purchases";

const TrainingPurchasesContainer: React.FC = () => {
  const { data, loading } = useTrainingPurchasesQuery();

  if (loading) return <Spinner />;
  if (!data) return <NoDataErrorMessage />;

  return <TrainingPurchases data={data} />;
};

export default TrainingPurchasesContainer;
