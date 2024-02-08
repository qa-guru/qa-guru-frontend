import { InputHTMLAttributes } from "react";
import { Control, FieldErrors, FieldValues, Path } from "react-hook-form";

export interface IFormInputText<T extends FieldValues> {
  control: Control<T, unknown>;
  label?: string;
  placeholder?: string;
  name: T[Path<T>];
  type?: string;
  multiline?: boolean;
  maxRows?: string | number;
  minRows?: string | number;
  inputProps?: InputHTMLAttributes<HTMLTextAreaElement>;
  autoComplete?: string;
  errors?: FieldErrors<T>;
}
