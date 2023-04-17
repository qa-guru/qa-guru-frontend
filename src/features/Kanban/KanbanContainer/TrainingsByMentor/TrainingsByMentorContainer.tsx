import React from "react";
import TrainingSelection from "../../KanbanView/components/TrainingSelection";
import { useTrainingsByMentorQuery } from "../../../../api/graphql/training/trainingsByMentor";
import {
  Order,
  TrainingSortField,
} from "../../../../api/graphql/generated/graphql";
import Spinner from "../../../../shared/Spinner";
import NoDataErrorMessage from "../../../../shared/NoDataErrorMessage";

const TrainingsByMentorContainer: React.FC = () => {
  const { data, loading } = useTrainingsByMentorQuery({
    variables: {
      offset: 0,
      limit: 20,
      sort: {
        field: TrainingSortField.Name,
        order: Order.Asc,
      },
    },
  });

  if (loading) return <Spinner />;
  if (!data) return <NoDataErrorMessage />;

  return <TrainingSelection data={data} />;
};

export default TrainingsByMentorContainer;
