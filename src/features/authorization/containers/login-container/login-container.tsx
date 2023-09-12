import React from "react";
import Login from "../../views/login";
import useAuth from "../../hooks/use-auth";

const LoginContainer: React.FC = () => {
  const { login, isLoading } = useAuth();

  return <Login login={login} isLoading={isLoading} />;
};

export default LoginContainer;
