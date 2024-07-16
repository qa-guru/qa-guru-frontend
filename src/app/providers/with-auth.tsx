import { AuthProvider } from "features/authorization/context/auth-context";
import { ComponentType } from "react";

export const withAuth = (Component: ComponentType) => () =>
  (
    <AuthProvider>
      <Component />
    </AuthProvider>
  );
