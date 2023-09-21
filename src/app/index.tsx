import React, { lazy } from "react";
import { useNavigate } from "react-router-dom";
import { withProviders } from "./providers";
import Spinner from "../shared/components/spinner";
import useAuth from "../features/authorization/hooks/use-auth";
import { useUserQuery } from "../api/graphql/generated/graphql";

const AuthRoutes = lazy(() => import("../routes/auth-routes"));
const AppRoutes = lazy(() => import("../routes/app-routes"));

const App = () => {
  const { isAuth, setIsAuth } = useAuth();
  const navigate = useNavigate();

  const { loading, data } = useUserQuery({
    onCompleted: () => {
      setIsAuth(true);
    },
    onError: () => {
      setIsAuth(false);
      navigate("/authorization");
    },
  });

  if (loading) return <Spinner />;

  return (
    <>
      {!isAuth ? <AuthRoutes /> : <AppRoutes userRoles={data?.user?.roles!} />}
    </>
  );
};

export default withProviders(App);
