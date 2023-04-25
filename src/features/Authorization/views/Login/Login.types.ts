export interface ILoginForm {
  password: string;
  username: string;
}

export interface ILogin {
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
}
