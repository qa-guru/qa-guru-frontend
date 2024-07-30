import { FC } from "react";

import {
  Order,
  UserSortField,
  useUsersQuery,
} from "api/graphql/generated/graphql";
import Spinner from "shared/components/spinners/app-spinner";
import NoDataErrorMessage from "shared/components/no-data-error-message";
import { FETCH_POLICY } from "shared/constants";

import { useTableAdminFilter } from "../../context/admin-table-context";
import Table from "../../views/table-columns";

const UsersContainer: FC = () => {
  const { filter } = useTableAdminFilter();

  const { data, loading, fetchMore } = useUsersQuery({
    variables: {
      offset: 0,
      limit: 10,
      sort: { field: UserSortField.Email, order: Order.Desc },
      filter: filter || {},
    },
    fetchPolicy: FETCH_POLICY.NETWORK_ONLY,
  });

  if (loading) return <Spinner />;
  if (!data) return <NoDataErrorMessage />;

  return <Table data={data} fetchMore={fetchMore} />;
};

export default UsersContainer;
