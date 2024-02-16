import {
  UserCreateInput,
  UserQuery,
  useCheckResetPasswordTokenLazyQuery,
  useCreateUserMutation,
  useResetPasswordMutation,
  useSetPasswordMutation,
  useUserQuery,
} from "api/graphql/generated/graphql";
import AuthService from "api/rest/auth-service";
import { FC, ReactNode, createContext, useContext, useState } from "react";
import { client } from "api";
import { useLocation, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import Spinner from "shared/components/spinner";

import { RESPONSE_STATUS, ROUTES } from "../constants";

interface IAuthProvider {
  children: ReactNode;
}

interface AuthContextType {
  isAuth: boolean;
  isLoading: boolean;
  setIsAuth: (isAuth: boolean) => void;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (data: UserCreateInput) => Promise<void>;
  data: UserQuery | undefined;
  resetPassword: (email: string) => Promise<void>;
  setNewPassword: (newPassword: string) => Promise<void>;
  confirmToken: (token: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  isAuth: false,
  isLoading: false,
  setIsAuth: () => {},
  login: async () => {},
  logout: async () => {},
  signup: async () => {},
  data: undefined,
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
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const location = useLocation();

  const [resetPasswordFn] = useResetPasswordMutation();
  const [setPasswordFn] = useSetPasswordMutation();
  const [createUser] = useCreateUserMutation();
  const [checkToken] = useCheckResetPasswordTokenLazyQuery();

  const { data, loading } = useUserQuery({
    onCompleted: () => {
      setIsAuth(true);
    },
    onError: () => {
      setIsAuth(false);
      navigate(ROUTES.AUTHORIZATION);
    },
    fetchPolicy: "cache-first",
  });

  if (loading) return <Spinner />;

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    await AuthService.login(username, password)
      .then((response) => {
        if (response.status === RESPONSE_STATUS.SUCCESSFUL) {
          setIsAuth(true);
          setIsLoading(false);
          client.refetchQueries({ include: ["user"] });
          navigate(ROUTES.HOME);
        } else {
          setIsLoading(false);
          enqueueSnackbar(t("login.unknownError"));
        }
      })
      .catch((error) => {
        if (error.response?.data.status === RESPONSE_STATUS.UNAUTHORIZED) {
          setIsLoading(false);
          enqueueSnackbar(t("login.unauthorized"));
        } else {
          setIsLoading(false);
          enqueueSnackbar(t("login.unknownError"));
        }
      });
  };

  const logout = async () => {
    setIsLoading(true);
    await AuthService.logout()
      .then((response) => {
        if (response.status === RESPONSE_STATUS.SUCCESSFUL) {
          setIsAuth(false);
          setIsLoading(false);
          client.refetchQueries({ include: ["user"] });
          navigate(ROUTES.AUTHORIZATION);
        } else {
          setIsLoading(false);
          enqueueSnackbar(t("logout.unknownError"));
        }
      })
      .catch(() => {
        setIsLoading(false);
        enqueueSnackbar(t("logout.unknownError"));
      });
  };

  const signup = async (data: UserCreateInput) => {
    setIsLoading(true);
    await createUser({
      variables: { input: data },
      onCompleted: (response) => {
        if (response) {
          setIsLoading(false);
          login(data.email, data.password);
        } else {
          setIsLoading(false);
        }
      },
      onError: (error) =>
        error.graphQLErrors.forEach(({ message }) => {
          setIsLoading(false);
          const email = message.split(" ").reverse()[0].replace(/['"]+/g, "");
          enqueueSnackbar(t("create.user", { email }));
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
        isAuth,
        isLoading,
        setIsAuth,
        login,
        logout,
        signup,
        data,
        resetPassword,
        setNewPassword,
        confirmToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
