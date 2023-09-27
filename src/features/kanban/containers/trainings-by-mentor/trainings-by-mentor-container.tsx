import React from "react";
import {
  Order,
  TrainingSortField,
  useTrainingsByMentorQuery,
} from "api/graphql/generated/graphql";
import { ITrainingsByMentorContainer } from "./trainings-by-mentor-container.types";
import TrainingSelection from "../../views/form/training-selection";

const TrainingsByMentorContainer: React.FC<ITrainingsByMentorContainer> = ({
  control,
}) => {
  const { data } = useTrainingsByMentorQuery({
    variables: {
      offset: 0,
      limit: 100,
      sort: {
        field: TrainingSortField.Name,
        order: Order.Asc,
      },
    },
  });

  return (
    <TrainingSelection
      items={data?.trainingsByMentor?.items}
      control={control}
    />
  );
};

export default TrainingsByMentorContainer;
