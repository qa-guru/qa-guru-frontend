import { FC } from "react";

import {
  Order,
  UserSortField,
  useUsersRatingQuery,
} from "api/graphql/generated/graphql";
import { AppSpinner } from "shared/components/spinners";
import NoDataErrorMessage from "shared/components/no-data-error-message";

import UsersTop from "../views/top-users/top-users";

const UsersRatingContainer: FC = () => {
  const { data, loading } = useUsersRatingQuery({
    variables: {
      offset: 0,
      limit: 50,
      sort: { field: UserSortField.Rating, order: Order.Desc },
    },
  });

  if (loading) return <AppSpinner />;
  if (!data) return <NoDataErrorMessage />;

  return <UsersTop data={data} />;
};

export default UsersRatingContainer;
