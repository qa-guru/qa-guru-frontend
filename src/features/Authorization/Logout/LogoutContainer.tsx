import React from "react";
import useAuth from "../../../hooks/useAuth";
import Logout from "./Logout";

interface ILogoutContainer {
  setAnchorElUser: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

const LogoutContainer: React.FC<ILogoutContainer> = (props) => {
  const { setAnchorElUser } = props;
  const { logout, isLoading } = useAuth();

  return (
    <Logout
      logout={logout}
      isLoading={isLoading}
      setAnchorElUser={setAnchorElUser}
    />
  );
};

export default LogoutContainer;
