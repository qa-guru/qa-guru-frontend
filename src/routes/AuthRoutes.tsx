import { Routes, Route, Navigate } from "react-router-dom";
import Authorization from "../screens/Authorization/Authorization";
import React from "react";
import Registration from "../screens/Registration/Registration";

const AuthRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/authorization" element={<Authorization />} />
      <Route path="/register" element={<Registration />} />
      <Route path="*" element={<Navigate to="/authorization" replace />} />
    </Routes>
  );
};

export default AuthRoutes;
