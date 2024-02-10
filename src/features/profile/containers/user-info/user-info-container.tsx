import { FC } from "react";
import Spinner from "shared/components/spinner";
import NoDataErrorMessage from "shared/components/no-data-error-message";
import { useProfileQuery, useUserQuery } from "api/graphql/generated/graphql";

import UserInfo from "../../views/user-info";

const UserInfoContainer: FC = () => {
  const { loading, data } = useUserQuery();
  const { loading: loadingProfile, data: dataProfile } = useProfileQuery();

  if (loading || loadingProfile) return <Spinner />;
  if (!data || !dataProfile) return <NoDataErrorMessage />;

  return <UserInfo data={data} dataProfile={dataProfile} />;
};

export default UserInfoContainer;
