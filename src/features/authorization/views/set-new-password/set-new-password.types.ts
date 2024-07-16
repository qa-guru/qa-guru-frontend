export interface ISetNewPasswordForm {
  newPassword: string;
  confirmPassword: string;
  token: string;
}

export interface ISetNewPassword {
  setNewPassword: (newPassword: string) => Promise<void>;
  isLoading: boolean;
}
