import React from "react";
import Spinner from "../../../shared/ui/Spinner/Spinner";
import { useTrainingQuery } from "../../../api/graphql/training/training";
import { useParams } from "react-router-dom";
import TrainingItemTitle from "../ui/TrainingItemTitle";

const TrainingItemTitleContainer: React.FC = () => {
  const { trainingId } = useParams();

  const { data, loading } = useTrainingQuery({
    variables: { id: trainingId! },
  });

  if (loading && !data) return <Spinner />;

  return <TrainingItemTitle data={data!} />;
};

export default TrainingItemTitleContainer;
