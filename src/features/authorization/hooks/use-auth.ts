import { useState } from "react";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AuthService from "../../../api/rest/auth-service";
import { client } from "../../../api";
import {
  useCreateUserMutation,
  UserCreateInput,
} from "../../../api/graphql/generated/graphql";

const useAuth = () => {
  const [createUser] = useCreateUserMutation();
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    await AuthService.login(username, password)
      .then((response) => {
        if (response.status === 200) {
          setIsLoading(false);
          client.refetchQueries({ include: ["user"] });
          navigate("/");
        } else {
          setIsLoading(false);
          enqueueSnackbar(t("login.unknownError"));
        }
      })
      .catch((error) => {
        if (error.response?.data.status === 401) {
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
        if (response.status === 200) {
          setIsLoading(false);
          client.refetchQueries({ include: ["user"] });
        } else {
          setIsLoading(false);
          enqueueSnackbar(t("logout.unknownError"));
        }
      })
      .catch((error) => {
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

  return { login, logout, signup, isSignedIn, setIsSignedIn, isLoading };
};

export default useAuth;
