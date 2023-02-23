import React from "react";
import Spinner from "../../../shared/Spinner/Spinner";
import { useTrainingQuery } from "../../../api/graphql/training/training";
import { useParams } from "react-router-dom";
import TrainingItemTitle from "./TrainingItemTitle";
import NoDataErrorMessage from "../../../shared/NoDataErrorMessage";

const TrainingItemTitleContainer: React.FC = () => {
  const { trainingId } = useParams();

  const { data, loading } = useTrainingQuery({
    variables: { id: trainingId! },
  });

  if (loading) return <Spinner />;
  if (!data) return <NoDataErrorMessage />;

  return <TrainingItemTitle data={data} />;
};

export default TrainingItemTitleContainer;
