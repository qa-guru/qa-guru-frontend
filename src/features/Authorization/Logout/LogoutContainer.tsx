import React from "react";
import useAuth from "../../../hooks/useAuth";
import Logout from "./Logout";

const LogoutContainer: React.FC = () => {
  const { logout, isLoading } = useAuth();

  return <Logout logout={logout} isLoading={isLoading} />;
};

export default LogoutContainer;
