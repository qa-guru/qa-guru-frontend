import React from "react";
import useAuth from "../../../hooks/useAuth";
import SignUp from "./SignUp";

const SignUpContainer: React.FC = () => {
  const { signup, isLoading } = useAuth();

  return <SignUp signup={signup} isLoading={isLoading} />;
};

export default SignUpContainer;
