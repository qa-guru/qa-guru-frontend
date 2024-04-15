import { FC } from "react";

import Login from "../../views/login";
import { useAuth } from "../../context/auth-context";

const LoginContainer: FC = () => {
  const { login, isLoading } = useAuth();

  return <Login {...{ login, isLoading }} />;
};

export default LoginContainer;
