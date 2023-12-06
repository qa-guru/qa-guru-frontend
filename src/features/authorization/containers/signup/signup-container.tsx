import { FC } from "react";
import Signup from "../../views/signup";
import { useAuth } from "../../context/auth-context";

const SignupContainer: FC = () => {
  const { signup, isLoading } = useAuth();

  return <Signup signup={signup} isLoading={isLoading} />;
};

export default SignupContainer;
