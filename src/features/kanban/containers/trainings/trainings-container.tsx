import { FC } from "react";
import {
  Order,
  TrainingSortField,
  useTrainingsQuery,
} from "api/graphql/generated/graphql";

import { ITrainingsContainer } from "./trainings-container.types";
import TrainingSelection from "../../views/training-selection";
import { STANDARD_QUERY_DEFAULTS } from "../../constants";

const TrainingsContainer: FC<ITrainingsContainer> = ({ control }) => {
  const { data } = useTrainingsQuery({
    variables: {
      offset: STANDARD_QUERY_DEFAULTS.OFFSET,
      limit: STANDARD_QUERY_DEFAULTS.LIMIT,
      sort: {
        field: TrainingSortField.Name,
        order: Order.Asc,
      },
    },
  });

  const items = data?.trainings?.items;

  return <TrainingSelection {...{ control, items }} />;
};

export default TrainingsContainer;
