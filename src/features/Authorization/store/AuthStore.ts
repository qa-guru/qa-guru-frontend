import { makeAutoObservable } from "mobx";
import axios from "axios";
import qs from "qs";
import { LOGOUT_URI, LOGIN_URI } from "../../../config";
import { ApolloClient } from "@apollo/client";

export class AuthStore {
  isLoggedIn: boolean = true;
  userName: string | null = null;

  constructor(private client: ApolloClient<unknown>) {
    makeAutoObservable(this);
  }

  login = async (username: string, password: string) => {
    const response = await axios(LOGIN_URI, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify({
        username,
        password,
      }),
    });

    if (response.status === 200) {
      this.isLoggedIn = true;
    }

    return response;
  };

  logout = async () => {
    this.isLoggedIn = false;

    const response = await axios(LOGOUT_URI, {
      method: "POST",
    });

    return response;
  };
}
