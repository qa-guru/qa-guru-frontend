import { Route, Routes } from "react-router-dom";
import { FC } from "react";
import Authorization from "screens/authorization";
import Registration from "screens/registration";

const AuthRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/authorization" element={<Authorization />} />
      <Route path="/register" element={<Registration />} />
    </Routes>
  );
};

export default AuthRoutes;
