import { InputHTMLAttributes, KeyboardEvent } from "react";
import { Control, FieldErrors, FieldValues, Path } from "react-hook-form";
import {
  type TextFieldPropsSizeOverrides,
  type InputProps,
} from "@mui/material";
import { OverridableStringUnion } from "@mui/types";

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
  InputProps?: InputProps;
  onKeyDown?: (event: KeyboardEvent<HTMLDivElement>) => void;
  autoComplete?: string;
  errors?: FieldErrors<T>;
  size?:
    | OverridableStringUnion<"small" | "medium", TextFieldPropsSizeOverrides>
    | undefined;
  disabled?: boolean;
}
