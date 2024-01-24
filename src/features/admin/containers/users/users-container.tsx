import { FC, useContext } from "react";
import {
  Order,
  UserSortField,
  useUsersQuery,
} from "api/graphql/generated/graphql";
import Spinner from "shared/components/spinner";
import NoDataErrorMessage from "shared/components/no-data-error-message";

import { TableAdminFilterContext } from "../../context/admin-table-context";
import Admin from "../../views/admin";

const UsersContainer: FC = () => {
  const { filter } = useContext(TableAdminFilterContext);

  console.log(filter);

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

  return <Admin data={data} fetchMore={fetchMore} />;
};

export default UsersContainer;
