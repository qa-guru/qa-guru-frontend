import { useState } from "react";
import { useCreateUserMutation } from "../api/graphql/user/createUser";
import AuthService from "../api/rest/authService";
import { client } from "../api/http";
import { UserCreateInput } from "../api/graphql/generated/graphql";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";

const useAuth = () => {
  const [createUser] = useCreateUserMutation();
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    await AuthService.login(username, password)
      .then((response) => {
        switch (response.status) {
          case 200:
            setIsLoading(false);
            client.refetchQueries({ include: ["user"] });
            break;
          default:
            setIsLoading(false);
            enqueueSnackbar(t("login.unknownError"));
        }
      })
      .catch((error) => {
        switch (error.response?.data.status) {
          case 401:
            setIsLoading(false);
            enqueueSnackbar(t("login.unauthorized"));
            break;
          default:
            setIsLoading(false);
            enqueueSnackbar(t("login.unknownError"));
        }
      });
  };

  const logout = async () => {
    setIsLoading(true);
    await AuthService.logout()
      .then((response) => {
        switch (response.status) {
          case 200:
            setIsLoading(false);
            client.refetchQueries({ include: ["user"] });
            break;
          default:
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
        error.graphQLErrors.map(({ message }) => {
          setIsLoading(false);
          const email = message.split(" ").reverse()[0].replace(/['"]+/g, "");
          enqueueSnackbar(t("create.user", { email }));
        }),
    });
  };

  return { login, logout, signup, isSignedIn, setIsSignedIn, isLoading };
};

export default useAuth;
