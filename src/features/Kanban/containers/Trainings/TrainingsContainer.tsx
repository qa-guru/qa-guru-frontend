import React from "react";
import { ITrainingsContainer } from "./TrainingsContainer.types";
import {
  Order,
  TrainingSortField,
  useTrainingsQuery,
} from "../../../../api/graphql/generated/graphql";
import TrainingSelection from "../../views/Form/TrainingSelection";

const TrainingsContainer: React.FC<ITrainingsContainer> = ({ control }) => {
  const { data, loading } = useTrainingsQuery({
    variables: {
      offset: 0,
      limit: 100,
      sort: {
        field: TrainingSortField.Name,
        order: Order.Asc,
      },
    },
  });

  return <TrainingSelection control={control} items={data?.trainings?.items} />;
};

export default TrainingsContainer;
