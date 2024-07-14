import { FC } from "react";
import { AppSpinner } from "shared/components/spinners";
import NoDataErrorMessage from "shared/components/no-data-error-message";
import { useUserQuery } from "api/graphql/generated/graphql";
import { FETCH_POLICY } from "shared/constants";

import UserInfo from "../../views/user-info";

const UserInfoContainer: FC = () => {
  const { loading, data } = useUserQuery({
    fetchPolicy: FETCH_POLICY.CACHE_FIRST,
  });

  if (loading) return <AppSpinner />;
  if (!data) return <NoDataErrorMessage />;

  return <UserInfo data={data} />;
};

export default UserInfoContainer;
