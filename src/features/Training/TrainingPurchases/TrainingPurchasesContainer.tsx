import React from "react";
import Spinner from "../../../shared/Spinner/Spinner";
import { useTrainingPurchasesQuery } from "../../../api/graphql/trainingPurchase/trainingPurchases";
import TrainingPurchases from "./TrainingPurchases";
import NoDataErrorMessage from "../../../shared/NoDataErrorMessage";

const TrainingPurchasesContainer: React.FC = () => {
  const { data, loading } = useTrainingPurchasesQuery();

  if (loading) return <Spinner />;
  if (!data) return <NoDataErrorMessage />;

  return <TrainingPurchases data={data} />;
};

export default TrainingPurchasesContainer;
