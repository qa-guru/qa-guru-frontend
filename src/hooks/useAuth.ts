import { useState } from "react";
import { useCreateUserMutation } from "../api/graphql/user/createUser";
import AuthService from "../api/rest/AuthService";
import { client } from "../http";
import { UserCreateInput } from "../generated/graphql";

const useAuth = () => {
  const [createUser] = useCreateUserMutation();
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  const login = async (username: string, password: string) => {
    const response = await AuthService.login(username, password);

    if (response.status === 200) {
      client.refetchQueries({ include: ["User"] });
    }

    return response;
  };

  const logout = async () => {
    const response = await AuthService.logout();

    if (response.status === 200) {
      client.refetchQueries({ include: ["User"] });
    }

    return response;
  };

  const signup = (data: UserCreateInput) => {
    createUser({
      variables: { input: data },
      onCompleted: () => {
        login(data.email, data.password);
      },
    });
  };

  return { login, logout, signup, isSignedIn, setIsSignedIn };
};

export default useAuth;
