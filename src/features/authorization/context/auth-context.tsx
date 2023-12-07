import {
  UserCreateInput,
  UserQuery,
  useCreateUserMutation,
  useUserQuery,
} from "api/graphql/generated/graphql";
import AuthService from "api/rest/auth-service";
import { FC, ReactNode, createContext, useContext, useState } from "react";
import { client } from "api";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import Spinner from "shared/components/spinner";

import { RESPONSE_STATUS } from "../constants";

interface IAuthProvider {
  children: ReactNode;
}

interface AuthContextType {
  isAuth: boolean;
  isLoading: boolean;
  setIsAuth: (isAuth: boolean) => void;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (data: UserCreateInput) => void;
  data: UserQuery | undefined;
}

const AuthContext = createContext<AuthContextType>({
  isAuth: false,
  isLoading: false,
  setIsAuth: () => {},
  login: async () => {},
  logout: async () => {},
  signup: () => {},
  data: undefined,
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth should be used inside AuthProvider");
  }
  return context;
};

export const AuthProvider: FC<IAuthProvider> = ({ children }) => {
  const [createUser] = useCreateUserMutation();
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const { data, loading } = useUserQuery({
    onCompleted: () => {
      setIsAuth(true);
    },
    onError: () => {
      setIsAuth(false);
      navigate("/authorization");
    },
  });

  if (loading) return <Spinner />;

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    await AuthService.login(username, password)
      .then((response) => {
        if (response.status === RESPONSE_STATUS.SUCCESSFUL) {
          setIsLoading(false);
          client.refetchQueries({ include: ["user"] });
          navigate("/");
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
          setIsLoading(false);
          client.refetchQueries({ include: ["user"] });
          navigate("/authorization");
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

  const signup = (data: UserCreateInput) => {
    setIsLoading(true);
    createUser({
      variables: { input: data },
      onCompleted: () => {
        login(data.email, data.password);
      },
      onError: (error) =>
        error.graphQLErrors.forEach(({ message }) => {
          setIsLoading(false);
          const email = message.split(" ").reverse()[0].replace(/['"]+/g, "");
          enqueueSnackbar(t("create.user", { email }));
        }),
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
