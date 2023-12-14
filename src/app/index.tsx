import Routing from "routes";
import { useAuth } from "features/authorization/context/auth-context";
import "./index.css";

import { withProviders } from "./providers";

const App = () => {
  const { data } = useAuth();
  const roles = data?.user?.roles;

  return <Routing roles={roles} />;
};

export default withProviders(App);
