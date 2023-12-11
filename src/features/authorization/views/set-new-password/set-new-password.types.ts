export interface ISetNewPasswordForm {
  newPassword: string;
  confirmPassword: string;
  token: string;
}

export interface ISetNewPassword {
  onSet: (token: string, newPassword: string) => void;
  loading: boolean;
}
