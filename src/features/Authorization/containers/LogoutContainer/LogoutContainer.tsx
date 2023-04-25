import React from "react";
import { ILogoutContainer } from "./LogoutContainer.types";
import Logout from "../../views/Logout";
import useAuth from "../../hooks/useAuth";
import Spinner from "../../../../shared/Spinner";

const LogoutContainer: React.FC<ILogoutContainer> = (props) => {
  const { setAnchorElUser } = props;
  const { logout, isLoading } = useAuth();

  if (isLoading) return <Spinner />;

  return <Logout logout={logout} setAnchorElUser={setAnchorElUser} />;
};

export default LogoutContainer;
