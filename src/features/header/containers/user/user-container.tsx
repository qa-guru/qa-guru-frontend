import { FC } from "react";
import { AppSpinner } from "shared/components/spinners";
import NoDataErrorMessage from "shared/components/no-data-error-message";
import { useUserQuery } from "api/graphql/generated/graphql";
import { userIdVar } from "cache";

import Profile from "../../views/profile";

const UserContainer: FC = () => {
  const { loading, data } = useUserQuery({
    onCompleted: (data) => {
      userIdVar(data?.user?.id);
    },
  });

  if (loading) return <AppSpinner />;
  if (!data) return <NoDataErrorMessage />;

  return <Profile data={data} />;
};

export default UserContainer;
