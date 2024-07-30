import { ComponentType } from "react";

import { AuthProvider } from "features/authorization/context/auth-context";

export const withAuth = (Component: ComponentType) => () =>
  (
    <AuthProvider>
      <Component />
    </AuthProvider>
  );
