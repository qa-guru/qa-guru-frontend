import { useState } from "react";
import { useCreateUserMutation } from "../api/mutation/createUser";
import AuthService from "../api/rest/AuthService";
import { client } from "../http";

const useAuth = () => {
  const [createUser] = useCreateUserMutation();
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  const login = async (username: string, password: string) => {
    const response = await AuthService.login(username, password);

    if (response.status === 200) {
      client.refetchQueries({ include: ["Person"] });
    }

    return response;
  };

  const logout = async () => {
    const response = await AuthService.logout();

    if (response.status === 200) {
      client.refetchQueries({ include: ["Person"] });
    }

    return response;
  };

  const signup = (password: string, username: string) => {
    createUser({
      variables: { password, username },
      onCompleted: () => {
        login(username, password);
      },
    });
  };

  return { login, logout, signup, isSignedIn, setIsSignedIn };
};

export default useAuth;
