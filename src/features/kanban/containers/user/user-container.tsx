import { FC } from "react";
import { useUserQuery } from "api/graphql/generated/graphql";
import Spinner from "shared/components/spinner";
import NoDataErrorMessage from "shared/components/no-data-error-message";

import { IUserContainer } from "./user-container.types";
import { UserProvider } from "../../context/user-context";

const UserContainer: FC<IUserContainer> = ({ children }) => {
  const { data, loading } = useUserQuery();

  if (loading) return <Spinner />;

  if (!data) return <NoDataErrorMessage />;

  return (
    <UserProvider userId={data.user?.id} userRoles={data.user?.roles}>
      {children}
    </UserProvider>
  );
};

export default UserContainer;
