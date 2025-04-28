import { FC, ReactNode, createContext, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { client } from "api";

import { userRolesVar } from "cache";
import AuthService from "api/rest/auth-service";
import {
  UserCreateInput,
  useCheckResetPasswordTokenLazyQuery,
  useCreateUserMutation,
  useResetPasswordMutation,
  useSetPasswordMutation,
  useUserRolesQuery,
} from "api/graphql/generated/graphql";

import { RESPONSE_STATUS, ROUTES } from "../constants";

interface IAuthProvider {
  children: ReactNode;
}

interface AuthContextType {
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (data: UserCreateInput) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  setNewPassword: (newPassword: string) => Promise<void>;
  confirmToken: (token: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  isLoading: false,
  login: async () => {},
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();

  const [resetPasswordFn] = useResetPasswordMutation();
  const [setPasswordFn] = useSetPasswordMutation();
  const [createUser] = useCreateUserMutation();
  const [checkToken] = useCheckResetPasswordTokenLazyQuery();

  const { loading: rolesLoading } = useUserRolesQuery({
    skip: !(localStorage.getItem("isAuth") === "true"),
    onCompleted: (data) => {
      userRolesVar(data?.user?.roles);
    },
  });

  const loading = isLoading || rolesLoading;

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    await AuthService.login(username, password)
      .then((response) => {
        if (response.status === RESPONSE_STATUS.SUCCESSFUL) {
          localStorage.setItem("isAuth", "true");
          setIsLoading(false);
          navigate(ROUTES.HOME);
        } else {
          setIsLoading(false);
          enqueueSnackbar("Не удалось войти");
        }
      })
      .catch((error) => {
        if (error.response?.data.status === RESPONSE_STATUS.UNAUTHORIZED) {
          setIsLoading(false);
          enqueueSnackbar(
            "Не удалось войти. Пользователь не существует или пароль неверный"
          );
        } else {
          setIsLoading(false);
          enqueueSnackbar("Не удалось войти");
        }
      });
  };

  const logout = async () => {
    setIsLoading(true);
    await AuthService.logout()
      .then(async (response) => {
        if (response.status === RESPONSE_STATUS.SUCCESSFUL) {
          localStorage.removeItem("isAuth");
          await client.clearStore();
          setIsLoading(false);
          navigate(ROUTES.AUTHORIZATION);
        } else {
          setIsLoading(false);
          enqueueSnackbar("Не удалось выйти");
        }
      })
      .catch(() => {
        setIsLoading(false);
        enqueueSnackbar("Не удалось выйти");
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
        isLoading: loading,
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
