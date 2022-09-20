import { useEffect, useState } from "react";
import { useSignUpMutation } from "../api/mutation/signup";
import { usePersonQuery } from "../api/query/person";
import AuthService from "../api/rest/AuthService";

const useAuth = () => {
  const [createUser] = useSignUpMutation();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  const { data, networkStatus, error, loading } = usePersonQuery({
    skip: !isLoggedIn,
    onCompleted: () => {
      setIsSignedIn(true);
      console.log(isSignedIn);
    },
  });

  // useEffect(() => {
  //   if (!loading && data !== undefined) {
  //     setIsLoggedIn(true);
  //   }
  // }, [networkStatus, error, loading]);

  const login = async (username: string, password: string) => {
    const response = await AuthService.login(username, password);

    if (response.status === 200) {
      setIsLoggedIn(true);
    } else {
      console.log("error");
    }

    return { response };
  };

  const logout = async () => {
    const response = await AuthService.logout();

    if (response.status === 200) {
      setIsLoggedIn(false);
    } else {
      console.log("error");
    }

    return response;
  };

  const signup = async (password: string, username: string) => {
    const response = await createUser({
      variables: { password, username },
    });

    return response;
  };

  return { login, logout, signup, setIsLoggedIn, isSignedIn };
};

export default useAuth;
