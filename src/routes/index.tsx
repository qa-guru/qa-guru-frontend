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
import { useReactiveVar } from "@apollo/client";
import { isAuthVar } from "features/authorization/auth-state";

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
  const isAuth = useReactiveVar(isAuthVar);

  if (isAuth) {
    return <Navigate to="/" />;
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
              element={route.props.element}
            />
          ))}
        </Route>
        <Route
          path="/authorization"
          element={
            <ProtectedRoute>
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <ProtectedRoute>
              <SignUpPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reset"
          element={
            <ProtectedRoute>
              <ResetPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reset/token"
          element={
            <ProtectedRoute>
              <ConfirmTokenPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reset/password"
          element={
            <ProtectedRoute>
              <SetPasswordPage />
            </ProtectedRoute>
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
