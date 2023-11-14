import { ErrorBoundary } from "react-error-boundary";
import { Navigate, Route, Routes } from "react-router-dom";
import NotFoundPage from "pages/not-found";
import { FC, ReactElement, ReactNode } from "react";
import { UserRole } from "api/graphql/generated/graphql";
import Layout from "shared/components/layout";
import {
  LoginPage,
  ResetMessagePage,
  ResetPage,
  SetPasswordPage,
  SignUpPage,
} from "pages/auth";
import { useAuth } from "features/authorization/context/auth-context";
import StudentRoutes from "./student";
import MentorRoutes from "./mentor";
import ManagerRoutes from "./manager";
import MasterRoutes from "./master";
import AdminRoutes from "./admin";

interface IProtectedRoute {
  children: ReactNode;
}

interface IRoutnig {
  roles: (UserRole | null)[] | null | undefined;
}

const ProtectedRoute: FC<IProtectedRoute> = ({ children }) => {
  const { isAuth } = useAuth();

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export const roleRoutes: { [key in UserRole]?: ReactElement[] } = {
  [UserRole.Student]: StudentRoutes,
  [UserRole.Mentor]: MentorRoutes,
  [UserRole.Manager]: ManagerRoutes,
  [UserRole.Master]: MasterRoutes,
  [UserRole.Admin]: AdminRoutes,
};

export const getUserRoutes = (userRoles: Array<UserRole | null> | null) => {
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
    <ErrorBoundary fallback={<NotFoundPage />}>
      <Routes>
        <Route path="/" element={<Layout userRoles={roles} />}>
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
          path="/reset/message"
          element={
            <ProtectedRoute>
              <ResetMessagePage />
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
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ErrorBoundary>
  );
};

export default Routing;
