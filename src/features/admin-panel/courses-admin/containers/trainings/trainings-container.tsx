import {
  Order,
  TrainingSortField,
  useTrainingsQuery,
} from "api/graphql/generated/graphql";
import { FC } from "react";
import NoDataErrorMessage from "shared/components/no-data-error-message";
import Spinner from "shared/components/spinners/app-spinner";

import TableColumns from "../../views/table-columns";

const TrainingsContainer: FC = () => {
  const { data, loading, fetchMore } = useTrainingsQuery({
    variables: {
      offset: 0,
      limit: 30,
      sort: { field: TrainingSortField.CreationDate, order: Order.Desc },
    },
  });

  if (loading) return <Spinner />;

  if (!data) return <NoDataErrorMessage />;

  return <TableColumns data={data} fetchMore={fetchMore} />;
};

export default TrainingsContainer;
