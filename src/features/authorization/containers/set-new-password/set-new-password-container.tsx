import { FC } from "react";

import SetNewPassword from "../../views/set-new-password";
import { useAuth } from "../../context/auth-context";

const SetNewPasswordContainer: FC = () => {
  const { setNewPassword, isLoading } = useAuth();

  return (
    <SetNewPassword setNewPassword={setNewPassword} isLoading={isLoading} />
  );
};

export default SetNewPasswordContainer;
