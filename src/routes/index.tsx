import { ErrorBoundary } from "react-error-boundary";
import { Navigate, Route, Routes } from "react-router-dom";
import NotFoundPage from "pages/not-found";
import { FC, ReactElement, ReactNode } from "react";
import { Maybe, UserRole } from "api/graphql/generated/graphql";
import Layout from "shared/components/layout";
import {
  LoginPage,
  ConfirmTokenPage,
  ResetPage,
  SetPasswordPage,
  SignUpPage,
} from "pages/auth";
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
  const { isAuth } = useAuth();

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
  const usersRoutes = getUserRoutes(roles!);

  return (
    <ErrorBoundary
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
