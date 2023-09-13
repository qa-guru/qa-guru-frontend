import React from "react";
import Signup from "../../views/signup";
import useAuth from "../../hooks/use-auth";

const SignupContainer: React.FC = () => {
  const { signup, isLoading } = useAuth();

  return <Signup signup={signup} isLoading={isLoading} />;
};

export default SignupContainer;
