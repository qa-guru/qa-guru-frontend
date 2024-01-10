import { FC } from "react";
import {
  Order,
  UserSortField,
  useUsersRatingQuery,
} from "api/graphql/generated/graphql";
import Spinner from "shared/components/spinner";
import NoDataErrorMessage from "shared/components/no-data-error-message";

import Users from "../views/users/users";

const UsersContainer: FC = () => {
  const { data, loading } = useUsersRatingQuery({
    variables: {
      offset: 0,
      limit: 50,
      sort: { field: UserSortField.Rating, order: Order.Desc },
    },
  });

  if (loading) return <Spinner />;
  if (!data) return <NoDataErrorMessage />;

  return <Users data={data} />;
};

export default UsersContainer;
