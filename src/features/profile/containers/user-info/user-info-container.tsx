import { FC } from "react";
import Spinner from "shared/components/spinner";
import NoDataErrorMessage from "shared/components/no-data-error-message";
import { useUserQuery } from "api/graphql/generated/graphql";

import UserInfo from "../../views/user-info";

const UserInfoContainer: FC = () => {
  const { loading, data } = useUserQuery();

  if (loading) return <Spinner />;
  if (!data) return <NoDataErrorMessage />;

  return <UserInfo user={data.user} />;
};

export default UserInfoContainer;
