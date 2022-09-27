import { useState } from "react";
import { useSignUpMutation } from "../api/mutation/signup";
import AuthService from "../api/rest/AuthService";
import { client } from "../http";

const useAuth = () => {
  const [createUser] = useSignUpMutation();
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  const login = async (username: string, password: string) => {
    const response = await AuthService.login(username, password);

    if (response.status === 200) {
      // тут стоит указать название ноды QL а не all
      client.refetchQueries({ include: "all" });
    } else {
      console.log("error");
    }

    return response;
  };

  const logout = async () => {
    const response = await AuthService.logout();

    if (response.status === 200) {
      client.refetchQueries({ include: "all" });
    } else {
      console.log("error");
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
