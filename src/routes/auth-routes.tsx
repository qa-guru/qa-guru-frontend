import { Route, Routes } from "react-router-dom";
import { FC } from "react";
import Authorization from "screens/authorization";
import Registration from "screens/registration";
import Reset from "screens/reset";
import ResetMessage from "screens/reset-message";
import SetPassword from "screens/set-password";

const AuthRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/authorization" element={<Authorization />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/reset" element={<Reset />} />
      <Route path="/reset/message" element={<ResetMessage />} />
      <Route path="/reset/password" element={<SetPassword />} />
    </Routes>
  );
};

export default AuthRoutes;
