import React from "react";
import Login from "./Login";
import useAuth from "../../../hooks/useAuth";

const LoginContainer: React.FC = () => {
  const { login, isLoading } = useAuth();

  return <Login login={login} isLoading={isLoading} />;
};

export default LoginContainer;
