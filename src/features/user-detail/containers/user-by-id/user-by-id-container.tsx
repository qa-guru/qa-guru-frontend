import { useUserByIdQuery } from "api/graphql/generated/graphql";
import { FC } from "react";
import { Navigate, useParams } from "react-router-dom";
import { AppSpinner } from "shared/components/spinners";

import UserDetail from "../../views/user-detail";

const UserByIdContainer: FC = () => {
  const { userId } = useParams();

  const { data, loading } = useUserByIdQuery({
    variables: {
      id: userId,
    },
    onError: () => {
      return <Navigate to="/404" />;
    },
  });

  if (loading) return <AppSpinner />;

  return <UserDetail data={data!} />;
};

export default UserByIdContainer;
