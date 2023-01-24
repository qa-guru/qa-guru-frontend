import {
  Control,
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
} from "react-hook-form";
import { TFunction } from "i18next";

export interface ILoginForm {
  password: string;
  username: string;
}

export interface ILogin {
  handleSubmit: UseFormHandleSubmit<ILoginForm>;
  control: Control<ILoginForm, any>;
  errors: FieldErrors<ILoginForm>;
  isLoading: boolean;
  doLogin: SubmitHandler<ILoginForm>;
  t: TFunction<"translation", undefined, "translation">;
}
