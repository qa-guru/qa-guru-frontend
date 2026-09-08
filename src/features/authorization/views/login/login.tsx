import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AppSpinner } from "shared/components/spinners";
import { OIDC_LOGIN_URI } from "config";

import { ROUTES } from "../../constants";
import { useAuth } from "../../context/auth-context";

/** LMS has no local login. IdP is auth.qa.guru (Keycloak). */
export const redirectToIdp = (): void => {
  window.location.replace(OIDC_LOGIN_URI);
};

const Login: FC = () => {
  const navigate = useNavigate();
  const { session, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (session) {
      navigate(ROUTES.HOME, { replace: true });
      return;
    }

    redirectToIdp();
  }, [session, isLoading, navigate]);

  return <AppSpinner />;
};

export default Login;
