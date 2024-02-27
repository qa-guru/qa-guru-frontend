import { FC } from "react";
import {
  Order,
  UserSortField,
  useUsersQuery,
} from "api/graphql/generated/graphql";
import Spinner from "shared/components/spinner";
import NoDataErrorMessage from "shared/components/no-data-error-message";

import { useTableAdminFilter } from "../../context/admin-table-context";
import Table from "../../views/table";

const UsersContainer: FC = () => {
  const { filter } = useTableAdminFilter();

  const { data, loading, fetchMore } = useUsersQuery({
    variables: {
      offset: 0,
      limit: 50,
      sort: { field: UserSortField.Email, order: Order.Desc },
      filter: filter || {},
    },
  });

  if (loading) return <Spinner />;
  if (!data) return <NoDataErrorMessage />;

  return <Table data={data} fetchMore={fetchMore} />;
};

export default UsersContainer;
