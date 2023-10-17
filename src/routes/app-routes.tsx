import { Route, Routes } from "react-router-dom";
import { FC } from "react";
import Layout from "shared/components/layout/layout";
import { UserRole } from "api/graphql/generated/graphql";
import { getUserRoutes } from "./role-routes";

interface AppRoutesProps {
  userRoles: Array<UserRole | null>;
}

const AppRoutes: FC<AppRoutesProps> = ({ userRoles }) => {
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
