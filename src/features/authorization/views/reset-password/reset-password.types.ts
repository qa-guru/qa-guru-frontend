export interface IResetPassword {
  onPasswordReset: (email: string) => void;
  loading: boolean;
}
