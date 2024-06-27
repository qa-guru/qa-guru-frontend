import { ErrorBoundary } from "react-error-boundary";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import NotFoundPage from "pages/not-found";
import { FC, ReactElement, ReactNode, useEffect, useState } from "react";
import { Maybe, UserRole } from "api/graphql/generated/graphql";
import Layout from "shared/components/layout";
import ScrollPageSectionPage from "pages/scroll-page-section";
import {
  LoginPage,
  ConfirmTokenPage,
  ResetPage,
  SetPasswordPage,
  SignUpPage,
} from "pages/auth";

import StudentRoutes from "./student";
import MentorRoutes from "./mentor";
import AdminRoutes from "./admin";
import LectorRoutes from "./lector";

interface IProtectedRoute {
  children: ReactNode;
}

interface IRoutnig {
  roles?: Maybe<Maybe<UserRole>[]>;
}

const ProtectedRoute: FC<IProtectedRoute> = ({ children }) => {
  const isAuth = localStorage.getItem("isAuth");

  if (!isAuth) {
    return <Navigate to="/authorization" replace />;
  }

  return <>{children}</>;
};

const AuthRoute: FC<IProtectedRoute> = ({ children }) => {
  const isAuth = localStorage.getItem("isAuth");

  if (isAuth) {
    return <Navigate to="/" replace />;
  }

  return <Layout isLogging>{children}</Layout>;
};

export const roleRoutes: { [key in UserRole]?: ReactElement[] } = {
  [UserRole.Student]: StudentRoutes,
  [UserRole.Mentor]: MentorRoutes,
  [UserRole.Lector]: LectorRoutes,
  [UserRole.Admin]: AdminRoutes,
};

export const getUserRoutes = (userRoles: Maybe<Array<Maybe<UserRole>>>) => {
  return userRoles?.reduce<ReactElement[]>((acc, role) => {
    const routes = role && roleRoutes[role];
    routes?.forEach((route) => {
      if (!acc.some((accRoute) => accRoute.key === route.key)) acc.push(route);
    });
    return acc;
  }, []);
};

const Routing: FC<IRoutnig> = ({ roles }) => {
  const location = useLocation();
  const [errorBoundaryKey, setErrorBoundaryKey] = useState<string>(
    location.pathname
  );

  useEffect(() => {
    setErrorBoundaryKey(location.pathname);
  }, [location]);

  const usersRoutes = getUserRoutes(roles!);

  return (
    <ErrorBoundary
      key={errorBoundaryKey}
      fallback={
        <Layout>
          <NotFoundPage />
        </Layout>
      }
    >
      <Routes>
        <Route path="/" element={<Layout />}>
          {usersRoutes?.map((route) => (
            <Route
              key={route.key}
              path={route.props.path}
              element={<ProtectedRoute>{route.props.element}</ProtectedRoute>}
            />
          ))}
        </Route>
        <Route
          path="/authorization"
          element={
            <AuthRoute>
              <LoginPage />
            </AuthRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthRoute>
              <SignUpPage />
            </AuthRoute>
          }
        />
        <Route
          path="/reset"
          element={
            <AuthRoute>
              <ResetPage />
            </AuthRoute>
          }
        />
        <Route
          path="/reset/token"
          element={
            <AuthRoute>
              <ConfirmTokenPage />
            </AuthRoute>
          }
        />
        <Route
          path="/reset/password"
          element={
            <AuthRoute>
              <SetPasswordPage />
            </AuthRoute>
          }
        />
        <Route
          key="scroll-page-section"
          path="/scroll-page-section"
          element={<ScrollPageSectionPage />}
        />
        <Route
          path="*"
          element={
            <Layout>
              <NotFoundPage />
            </Layout>
          }
        />
      </Routes>
    </ErrorBoundary>
  );
};

export default Routing;
