import { FC } from "react";

import { userIdVar } from "cache";
import { AppSpinner } from "shared/components/spinners";
import { useUserQuery } from "api/graphql/generated/graphql";
import { FETCH_POLICY } from "shared/constants";

import Profile from "../../views/profile";

const UserContainer: FC = () => {
  const { loading, data } = useUserQuery({
    onCompleted: (data) => {
      userIdVar(data?.user?.id);
    },
    fetchPolicy: FETCH_POLICY.CACHE_AND_NETWORK,
    errorPolicy: "all",
  });

  if (loading && !data) return <AppSpinner />;
  if (!data) return null;

  return <Profile data={data} />;
};

export default UserContainer;
