export interface IResetForm {
  username: string;
}

export interface IResetPassword {
  onReset: (email: string) => void;
  loading: boolean;
}
