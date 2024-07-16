import { FC } from "react";

import Login from "../../views/login";
import { useAuth } from "../../context/auth-context";

const LoginContainer: FC = () => {
  const { login, isLoading } = useAuth();

  return <Login login={login} isLoading={isLoading} />;
};

export default LoginContainer;
