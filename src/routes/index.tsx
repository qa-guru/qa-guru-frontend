import { ErrorBoundary } from "react-error-boundary";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { FC, ReactElement, ReactNode, useEffect, useState } from "react";

import { userRolesVar } from "cache";
import NotFoundPage from "pages/not-found";
import {
  LoginPage,
  ConfirmTokenPage,
  ResetPage,
  SetPasswordPage,
  SignUpPage,
} from "pages/auth";
import { Maybe, UserRole } from "api/graphql/generated/graphql";
import { AppSpinner } from "shared/components/spinners";
import Layout from "shared/components/layout";
import ScrollPageSectionPage from "pages/scroll-page-section";
import { useAuth } from "features/authorization/context/auth-context";

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

export const roleRoutes: { [key in UserRole]?: ReactElement[] } = {
  [UserRole.Student]: StudentRoutes,
  [UserRole.Mentor]: MentorRoutes,
  [UserRole.Lector]: LectorRoutes,
  [UserRole.Admin]: AdminRoutes,
};

export const getUserRoutes = (userRoles: Maybe<Array<Maybe<UserRole>>>) => {
  if (!userRoles) return [];

  const routesSet = new Set<ReactElement>();

  userRoles.forEach((role) => {
    const routes = roleRoutes[role!];
    routes?.forEach((route) => routesSet.add(route));
  });

  return Array.from(routesSet);
};

const Routing: FC<IRoutnig> = () => {
  const location = useLocation();
  const [errorBoundaryKey, setErrorBoundaryKey] = useState<string>(
    location.pathname
  );

  useEffect(() => {
    setErrorBoundaryKey(location.pathname);
  }, [location]);

  const { isLoading } = useAuth();
  const userRoles = userRolesVar();
  const usersRoutes = getUserRoutes(userRoles);

  if (isLoading) {
    return <AppSpinner />;
  }

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
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          {usersRoutes?.map((route) => (
            <Route
              key={route.key}
              path={route.props.path}
              element={route.props.element}
            />
          ))}
        </Route>
        <Route
          path="/authorization"
          element={
            <Layout isLogging>
              <LoginPage />
            </Layout>
          }
        />
        <Route
          path="/signup"
          element={
            <Layout isLogging>
              <SignUpPage />
            </Layout>
          }
        />
        <Route
          path="/reset"
          element={
            <Layout isLogging>
              <ResetPage />
            </Layout>
          }
        />
        <Route
          path="/reset/token"
          element={
            <Layout isLogging>
              <ConfirmTokenPage />
            </Layout>
          }
        />
        <Route
          path="/reset/password"
          element={
            <Layout isLogging>
              <SetPasswordPage />
            </Layout>
          }
        />
        <Route
          path="*"
          element={
            <Layout>
              <NotFoundPage />
            </Layout>
          }
        />
        <Route
          key="scroll-page-section"
          path="/scroll-page-section"
          element={<ScrollPageSectionPage />}
        />
      </Routes>
    </ErrorBoundary>
  );
};

export default Routing;
