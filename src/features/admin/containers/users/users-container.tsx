import { FC } from "react";
import Spinner from "../../../../shared/components/spinner";
import NoDataErrorMessage from "../../../../shared/components/no-data-error-message";
import Admin from "../../views";
import {
  Order,
  UserSortField,
  useUsersQuery,
} from "../../../../api/graphql/generated/graphql";

const UsersContainer: FC = () => {
  const { data, loading } = useUsersQuery({
    variables: {
      offset: 0,
      limit: 8,
      sort: { field: UserSortField.Email, order: Order.Asc },
    },
  });

  if (loading) return <Spinner />;
  if (!data) return <NoDataErrorMessage />;

  return <Admin data={data} />;
};

export default UsersContainer;
