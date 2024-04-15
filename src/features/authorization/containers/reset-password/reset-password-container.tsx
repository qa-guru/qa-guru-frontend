import { FC } from "react";

import ResetPassword from "../../views/reset-password";
import { useAuth } from "../../context/auth-context";

const ResetPasswordContainer: FC = () => {
  const { resetPassword, isLoading } = useAuth();

  return <ResetPassword {...{ resetPassword, isLoading }} />;
};

export default ResetPasswordContainer;
