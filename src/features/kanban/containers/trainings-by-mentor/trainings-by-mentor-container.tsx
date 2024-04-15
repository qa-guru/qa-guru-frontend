import { FC } from "react";
import {
  Order,
  TrainingSortField,
  useTrainingsByMentorQuery,
} from "api/graphql/generated/graphql";

import { ITrainingsByMentorContainer } from "./trainings-by-mentor-container.types";
import TrainingSelection from "../../views/training-selection";
import { STANDARD_QUERY_DEFAULTS } from "../../constants";

const TrainingsByMentorContainer: FC<ITrainingsByMentorContainer> = ({
  control,
}) => {
  const { data } = useTrainingsByMentorQuery({
    variables: {
      offset: STANDARD_QUERY_DEFAULTS.OFFSET,
      limit: STANDARD_QUERY_DEFAULTS.LIMIT,
      sort: {
        field: TrainingSortField.Name,
        order: Order.Asc,
      },
    },
  });

  const items = data?.trainingsByMentor?.items;

  return <TrainingSelection {...{ control, items }} />;
};

export default TrainingsByMentorContainer;
