import { FC } from "react";

import ConfirmToken from "../../views/confirm-token";
import { useAuth } from "../../context/auth-context";

const ConfirmTokenContainer: FC = () => {
  const { confirmToken, isLoading } = useAuth();

  return <ConfirmToken confirmToken={confirmToken} isLoading={isLoading} />;
};

export default ConfirmTokenContainer;
