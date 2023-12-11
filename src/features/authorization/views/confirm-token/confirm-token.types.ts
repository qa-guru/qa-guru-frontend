export interface IConfirmTokenForm {
  token: string;
}

export interface IConfirmToken {
  onTokenConfirmation: (token: string) => void;
  loading: boolean;
}
