import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import Authorization from "../screens/Authorization";
import Registration from "../screens/Registration";

const AuthRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/authorization" element={<Authorization />} />
      <Route path="/register" element={<Registration />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AuthRoutes;
