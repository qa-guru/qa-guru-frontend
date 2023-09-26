import React from "react";
import { ITrainingsByMentorContainer } from "./trainings-by-mentor-container.types";
import TrainingSelection from "../../views/form/training-selection";
import {
  Order,
  TrainingSortField,
  useTrainingsByMentorQuery,
} from "../../../../../../../../Downloads/qa-guru-frontend-develop 2/src/api/graphql/generated/graphql";

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
