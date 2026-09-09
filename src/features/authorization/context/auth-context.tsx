import { FC, ReactNode, createContext, useContext, useEffect, useState } from "react";
import { useReactiveVar } from "@apollo/client";
import { client } from "api";

import { userRolesVar } from "cache";
import { fetchAuthSession } from "api/rest/auth-session";
import { AuthSession } from "api/rest/idp-roles";
import { userRolesFromIdp } from "api/rest/idp-user-roles";
import { OIDC_LOGIN_URI } from "config";

interface IAuthProvider {
  children: ReactNode;
}

interface AuthContextType {
  isLoading: boolean;
  session: AuthSession | null;
  login: () => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  isLoading: false,
  session: null,
  login: () => {},
  logout: async () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth should be used inside AuthProvider");
  }
  return context;
};

export const AuthProvider: FC<IAuthProvider> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [session, setSession] = useState<AuthSession | null>(null);
  useReactiveVar(userRolesVar);

  useEffect(() => {
    let cancelled = false;

    fetchAuthSession()
      .then((next) => {
        if (cancelled) {
          return;
        }

        setSession(next);
        if (next) {
          userRolesVar(userRolesFromIdp(next.role));
        }
      })
      .catch(() => {
        if (!cancelled) {
          setSession(null);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const login = () => {
    window.location.assign(OIDC_LOGIN_URI);
  };

  const logout = async () => {
    setIsLoading(true);
    userRolesVar([]);
    setSession(null);
    await client.clearStore();
    window.location.assign("/logout");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        session,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
