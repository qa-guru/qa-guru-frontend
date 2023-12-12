export interface IResetForm {
  username: string;
}

export interface IResetPassword {
  resetPassword: (email: string) => Promise<void>;
  isLoading: boolean;
}
