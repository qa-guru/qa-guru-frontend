import React from "react";
import { ITrainingsByMentorContainer } from "./TrainingsByMentorContainer.types";
import TrainingSelection from "../../views/Form/TrainingSelection";
import { useTrainingsByMentorQuery } from "../../../../api/graphql/training/trainingsByMentor";
import {
  Order,
  TrainingSortField,
} from "../../../../api/graphql/generated/graphql";

const TrainingsByMentorContainer: React.FC<ITrainingsByMentorContainer> = ({
  control,
}) => {
  const { data, loading } = useTrainingsByMentorQuery({
    variables: {
      offset: 0,
      limit: 100,
      sort: {
        field: TrainingSortField.Name,
        order: Order.Asc,
      },
    },
  });

  return <TrainingSelection data={data!} control={control} />;
};

export default TrainingsByMentorContainer;
