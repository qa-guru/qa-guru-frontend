import React from "react";
import Spinner from "../../../shared/Spinner";
import { useTrainingPurchasesQuery } from "../../../api/graphql/trainingPurchase/trainingPurchases";
import TrainingPurchases from "./TrainingPurchases";

const TrainingPurchasesContainer: React.FC = () => {
  const { data, loading } = useTrainingPurchasesQuery();

  if (loading && !data) return <Spinner />;

  return <TrainingPurchases data={data!} />;
};

export default TrainingPurchasesContainer;
