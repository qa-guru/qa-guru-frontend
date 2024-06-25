import {
  Order,
  TrainingSortField,
  useTrainingsQuery,
} from "api/graphql/generated/graphql";
import { FC } from "react";
import NoDataErrorMessage from "shared/components/no-data-error-message";

import InputSelectTrainings from "../../views/input-select-trainings";

const TrainingsContainer: FC = () => {
  const { data, loading } = useTrainingsQuery({
    variables: {
      offset: 0,
      limit: 100,
      sort: { field: TrainingSortField.CreationDate, order: Order.Desc },
    },
  });

  if (!data) return <NoDataErrorMessage />;

  return <InputSelectTrainings data={data} loading={loading} />;
};

export default TrainingsContainer;
