import React from "react";
import useAuth from "../../../hooks/useAuth";
import Logout from "./Logout";
import Spinner from "../../../shared/Spinner/Spinner";

interface ILogoutContainer {
  setAnchorElUser: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

const LogoutContainer: React.FC<ILogoutContainer> = (props) => {
  const { setAnchorElUser } = props;
  const { logout, isLoading } = useAuth();

  if (isLoading) return <Spinner />;

  return <Logout logout={logout} setAnchorElUser={setAnchorElUser} />;
};

export default LogoutContainer;
