import { useUserByIdQuery } from "api/graphql/generated/graphql";
import { FC } from "react";
import { useParams } from "react-router-dom";
import NoDataErrorMessage from "shared/components/no-data-error-message";
import { AppSpinner } from "shared/components/spinners";

import UserDetail from "../../views/user-detail";

const UserByIdContainer: FC = () => {
  const { userId } = useParams();

  const { data, loading } = useUserByIdQuery({
    variables: {
      id: userId,
    },
  });

  if (loading) return <AppSpinner />;
  if (!data) return <NoDataErrorMessage />;

  return <UserDetail data={data} />;
};

export default UserByIdContainer;
