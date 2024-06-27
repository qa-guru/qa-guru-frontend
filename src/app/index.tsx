import Routing from "routes";
// import { useAuth } from "features/authorization/context/auth-context";

import { withProviders } from "./providers";

const App = () => {
  // const { data } = useAuth();
  // const roles = data?.user?.roles;

  const roles = ["ADMIN"];

  return <Routing roles={roles} />;
};

export default withProviders(App);
