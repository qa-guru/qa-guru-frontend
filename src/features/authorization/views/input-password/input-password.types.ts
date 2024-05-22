import { Control, FieldErrors, FieldValues, Path } from "react-hook-form";
import { type InputLabelProps } from "@mui/material";

export interface IInputPassword<T extends FieldValues> {
  control: Control<T, unknown>;
  label?: string;
  placeholder?: string;
  name: T[Path<T>];
  errors?: FieldErrors<T>;
  InputLabelProps?: InputLabelProps;
}
