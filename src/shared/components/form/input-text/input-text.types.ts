import { InputHTMLAttributes } from "react";
import { Control, FieldErrors, FieldValues } from "react-hook-form";

export interface IFormInputText<T extends FieldValues> {
  control: Control<T, unknown>;
  label?: string;
  placeholder?: string;
  name: T[keyof T];
  type?: string;
  multiline?: boolean;
  maxRows?: string | number;
  minRows?: string | number;
  inputProps?: InputHTMLAttributes<HTMLTextAreaElement>;
  errors: FieldErrors<T>;
}
