import axios, { type AxiosResponse } from "axios";
import qs from "qs";

import { LOGIN_URI, LOGOUT_URI, REFRESH_TOKEN_URI } from "../../config";

export interface LoginResponse {
  username: string;
  password: string;
}

export default class AuthService {
  static login(
    username: string,
    password: string
  ): Promise<AxiosResponse<LoginResponse>> {
    return axios({
      method: "POST",
      url: LOGIN_URI,
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify({
        username,
        password,
      }),
    });
  }

  static logout(): Promise<AxiosResponse<void>> {
    return axios.get(LOGOUT_URI, {
      method: "GET",
    });
  }

  static refreshToken(): Promise<AxiosResponse<void>> {
    return axios.get(REFRESH_TOKEN_URI, {
      method: "GET",
    });
  }
}
