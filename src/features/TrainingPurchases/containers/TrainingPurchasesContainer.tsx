import React from "react";
import TrainingPurchases from "../views/TrainingPurchases";
import Spinner from "../../../shared/components/Spinner";
import NoDataErrorMessage from "../../../shared/components/NoDataErrorMessage";
import { useTrainingPurchasesQuery } from "../../../api/graphql/generated/graphql";

const TrainingPurchasesContainer: React.FC = () => {
  const { data, loading } = useTrainingPurchasesQuery();

  if (loading) return <Spinner />;
  if (!data) return <NoDataErrorMessage />;

  return <TrainingPurchases data={data} />;
};

export default TrainingPurchasesContainer;
