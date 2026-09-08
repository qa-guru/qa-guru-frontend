import { ErrorBoundary } from "react-error-boundary";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { FC, ReactElement, ReactNode, useEffect, useState } from "react";
import { useReactiveVar } from "@apollo/client";

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
import CabinetPreviewPage from "pages/cabinet-preview";
import { getProvisioningAccessToken } from "api/rest/provisioning-token";
import { userRolesFromIdp } from "api/rest/idp-user-roles";
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

function applyDevCabinetHatch(): boolean {
  if (!import.meta.env.DEV) {
    return false;
  }

  const fromQuery =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("access_token")
      : null;
  const token = getProvisioningAccessToken() || fromQuery;

  if (!token) {
    return false;
  }

  const current = userRolesVar();

  if (!current || current.length === 0) {
    userRolesVar(userRolesFromIdp("student"));
  }

  return true;
}

const ProtectedRoute: FC<IProtectedRoute> = ({ children }) => {
  const { session, isLoading } = useAuth();
  const hatch = applyDevCabinetHatch();

  if (isLoading) {
    return <AppSpinner />;
  }

  if (!session && !hatch) {
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

  const { isLoading, session } = useAuth();
  applyDevCabinetHatch();
  const userRoles = useReactiveVar(userRolesVar);
  const usersRoutes = getUserRoutes(
    userRoles && userRoles.length > 0
      ? userRoles
      : userRolesFromIdp(session?.role || null)
  );

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
        {import.meta.env.DEV && (
          <Route
            key="cabinet-preview"
            path="/cabinet-preview"
            element={
              <Layout isLogging>
                <CabinetPreviewPage />
              </Layout>
            }
          />
        )}
      </Routes>
    </ErrorBoundary>
  );
};

export default Routing;
