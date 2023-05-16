import { Route, Routes } from "react-router-dom";
import React from "react";
import { getUserRoutes } from "./RoleRoutes";
import Layout from "../shared/Layout";
import { UserRole } from "../api/graphql/generated/graphql";

interface AppRoutesProps {
  userRoles: Array<UserRole | null>;
}

const AppRoutes: React.FC<AppRoutesProps> = ({ userRoles }) => {
  const userRoutes = getUserRoutes(userRoles);

  return (
    <Routes>
      <Route path="/" element={<Layout userRoles={userRoles} />}>
        {userRoutes.map((route) => route)}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
