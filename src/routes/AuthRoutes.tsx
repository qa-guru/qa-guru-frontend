import { Routes, Route } from "react-router-dom";
import Authorization from "../screens/Authorization/Authorization";
import React from "react";

const AuthRotes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Authorization />} />
    </Routes>
  );
};

export default AuthRotes;
