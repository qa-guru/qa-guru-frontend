import React from "react";
import Spinner from "shared/components/spinner";
import { ILogoutContainer } from "./logout-container.types";
import Logout from "../../views/logout";
import useAuth from "../../hooks/use-auth";

const LogoutContainer: React.FC<ILogoutContainer> = (props) => {
  const { setAnchorElUser } = props;
  const { logout, isLoading } = useAuth();

  if (isLoading) return <Spinner />;

  return <Logout logout={logout} setAnchorElUser={setAnchorElUser} />;
};

export default LogoutContainer;
