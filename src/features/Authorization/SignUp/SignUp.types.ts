import {
  Control,
  FieldErrors,
  SubmitHandler,
  UseFormGetValues,
  UseFormHandleSubmit,
} from "react-hook-form";
import { UserCreateInput } from "../../../generated/graphql";
import React from "react";
import { TFunction } from "i18next";

export interface ISignUp {
  handleSubmit: UseFormHandleSubmit<UserCreateInput>;
  control: Control<UserCreateInput, any>;
  errors: FieldErrors<UserCreateInput>;
  setValueConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: SubmitHandler<UserCreateInput>;
  valueConfirmPassword: string;
  getValues: UseFormGetValues<UserCreateInput>;
  t: TFunction<"translation", undefined, "translation">;
}
