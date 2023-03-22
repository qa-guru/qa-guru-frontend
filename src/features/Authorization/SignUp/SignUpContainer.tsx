import React from "react";
import SignUp from "./SignUp";
import useAuth from "../../../hooks/useAuth";

const SignUpContainer: React.FC = () => {
  const { signup, isLoading } = useAuth();

  return <SignUp signup={signup} isLoading={isLoading} />;
};

export default SignUpContainer;
