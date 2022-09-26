import { Routes, Route } from "react-router-dom";
import React from "react";
import Registration from "../screens/Registration/Registration";

const RegisterRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/register" element={<Registration />} />
    </Routes>
  );
};

export default RegisterRoutes;
