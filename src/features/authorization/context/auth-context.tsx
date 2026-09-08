import { FC, ReactNode, createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useReactiveVar } from "@apollo/client";
import { client } from "api";

import { userRolesVar } from "cache";
import { fetchAuthSession } from "api/rest/auth-session";
import { AuthSession } from "api/rest/idp-roles";
import { userRolesFromIdp } from "api/rest/idp-user-roles";
import { OIDC_LOGIN_URI } from "config";
import {
  UserCreateInput,
  useCheckResetPasswordTokenLazyQuery,
  useCreateUserMutation,
  useResetPasswordMutation,
  useSetPasswordMutation,
} from "api/graphql/generated/graphql";

import { ROUTES } from "../constants";

interface IAuthProvider {
  children: ReactNode;
}

interface AuthContextType {
  isLoading: boolean;
  session: AuthSession | null;
  login: () => void;
  logout: () => Promise<void>;
  signup: (data: UserCreateInput) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  setNewPassword: (newPassword: string) => Promise<void>;
  confirmToken: (token: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  isLoading: false,
  session: null,
  login: () => {},
  logout: async () => {},
  signup: async () => {},
  resetPassword: async () => {},
  setNewPassword: async () => {},
  confirmToken: async () => {},
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
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  useReactiveVar(userRolesVar);

  const [resetPasswordFn] = useResetPasswordMutation();
  const [setPasswordFn] = useSetPasswordMutation();
  const [createUser] = useCreateUserMutation();
  const [checkToken] = useCheckResetPasswordTokenLazyQuery();

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
    localStorage.removeItem("isAuth");
    userRolesVar([]);
    setSession(null);
    await client.clearStore();
    window.location.assign("/logout");
  };

  const signup = async (data: UserCreateInput) => {
    setIsLoading(true);
    await createUser({
      variables: { input: data },
      onCompleted: (response) => {
        if (response) {
          setIsLoading(false);
          login();
        } else {
          setIsLoading(false);
        }
      },
      onError: (error) =>
        error.graphQLErrors.forEach(({ message }) => {
          setIsLoading(false);
          const email = message.split(" ").reverse()[0].replace(/['"]+/g, "");
          enqueueSnackbar(
            `Пользователь уже существует с электронной почтой, ${email}`
          );
        }),
    });
  };

  const resetPassword = async (email: string) => {
    setIsLoading(true);
    await resetPasswordFn({
      variables: { email },
      onCompleted: (response) => {
        if (response) {
          setIsLoading(false);
          navigate(ROUTES.TOKEN);
        } else {
          setIsLoading(false);
          enqueueSnackbar(
            "Ошибка при отправке письма. Пожалуйста, попробуйте снова"
          );
        }
      },
      onError: () => {
        setIsLoading(false);
        enqueueSnackbar("Произошла ошибка. Пожалуйста, попробуйте снова");
      },
    });
  };

  const setNewPassword = async (newPassword: string) => {
    setIsLoading(true);

    const token = new URLSearchParams(location.search).get("token");

    if (!token) {
      enqueueSnackbar("Токен не найден");
    }

    await setPasswordFn({
      variables: { token: token!, newPassword },
      onCompleted: (response) => {
        if (response) {
          setIsLoading(false);
          navigate(ROUTES.AUTHORIZATION);
        } else {
          setIsLoading(false);
          enqueueSnackbar("Ошибка при установке нового пароля");
        }
      },
      onError: () => {
        setIsLoading(false);
        enqueueSnackbar("Произошла ошибка. Пожалуйста, попробуйте снова");
      },
    });
  };

  const confirmToken = async (token: string) => {
    await checkToken({
      variables: { token },
      onCompleted: (response) => {
        if (response) {
          setIsLoading(false);
          navigate(`${ROUTES.PASSWORD}?token=${encodeURIComponent(token)}`);
        } else {
          setIsLoading(false);
          enqueueSnackbar("Неверный токен");
        }
      },
      onError: () => {
        setIsLoading(false);
        enqueueSnackbar(
          "Произошла ошибка при проверке токена. Пожалуйста, попробуйте снова"
        );
      },
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        session,
        login,
        logout,
        signup,
        resetPassword,
        setNewPassword,
        confirmToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
