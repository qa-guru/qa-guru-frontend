import { FC } from "react";
import { AppSpinner } from "shared/components/spinners";

import { ILogoutContainer } from "./logout-container.types";
import Logout from "../../views/logout";
import { useAuth } from "../../context/auth-context";

const LogoutContainer: FC<ILogoutContainer> = (props) => {
  const { setAnchorElUser } = props;
  const { logout, isLoading } = useAuth();

  if (isLoading) return <AppSpinner />;

  return <Logout logout={logout} setAnchorElUser={setAnchorElUser} />;
};

export default LogoutContainer;
