import { FC } from "react";
import { useParams } from "react-router-dom";

import { useUserByIdQuery } from "api/graphql/generated/graphql";
import NotFoundPage from "pages/not-found";
import ProfilePage from "pages/profile";
import { AppSpinner } from "shared/components/spinners";
import NoDataErrorMessage from "shared/components/no-data-error-message";
import { FETCH_POLICY } from "shared/constants";

import UserDetail from "../../views/user-detail";
import { isNumericUserId, isOwnProfileAlias } from "./user-id-param";

const UserByIdContainer: FC = () => {
  const { userId } = useParams();
  const ownProfile = isOwnProfileAlias(userId);
  const numericId = isNumericUserId(userId);

  const { data, loading } = useUserByIdQuery({
    variables: {
      id: userId,
    },
    fetchPolicy: FETCH_POLICY.CACHE_AND_NETWORK,
    skip: !numericId,
  });

  if (ownProfile) {
    return <ProfilePage />;
  }

  if (!numericId) {
    return <NotFoundPage />;
  }

  if (loading) return <AppSpinner />;
  if (!data?.userById) return <NoDataErrorMessage />;

  return <UserDetail data={data} />;
};

export default UserByIdContainer;
