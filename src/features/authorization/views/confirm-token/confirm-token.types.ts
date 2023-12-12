export interface IConfirmTokenForm {
  token: string;
}

export interface IConfirmToken {
  confirmToken: (token: string) => Promise<void>;
  isLoading: boolean;
}
