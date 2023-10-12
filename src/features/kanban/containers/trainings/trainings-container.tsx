import React from "react";
import {
  Order,
  TrainingSortField,
  useTrainingsQuery,
} from "api/graphql/generated/graphql";
import { ITrainingsContainer } from "./trainings-container.types";
import TrainingSelection from "../../views/form/training-selection";
import { STANDARD_QUERY_DEFAULTS } from "../../constants/constants";

const TrainingsContainer: React.FC<ITrainingsContainer> = ({ control }) => {
  const { data, loading } = useTrainingsQuery({
    variables: {
      offset: STANDARD_QUERY_DEFAULTS.OFFSET,
      limit: STANDARD_QUERY_DEFAULTS.LIMIT,
      sort: {
        field: TrainingSortField.Name,
        order: Order.Asc,
      },
    },
  });

  return <TrainingSelection control={control} items={data?.trainings?.items} />;
};

export default TrainingsContainer;
