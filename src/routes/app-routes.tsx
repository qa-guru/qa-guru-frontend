import { Route, Routes } from "react-router-dom";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import Layout from "shared/components/layout/layout";
import { UserRole } from "api/graphql/generated/graphql";
import { getUserRoutes } from "./role-routes";

interface AppRoutesProps {
  userRoles: Array<UserRole | null>;
}

const AppRoutes: React.FC<AppRoutesProps> = ({ userRoles }) => {
  const userRoutes = getUserRoutes(userRoles);

  return (
    <ErrorBoundary fallback={<div>Not found</div>}>
      <Routes>
        <Route path="/" element={<Layout userRoles={userRoles} />}>
          {userRoutes.map((route) => route)}
        </Route>
      </Routes>
    </ErrorBoundary>
  );
};

export default AppRoutes;
