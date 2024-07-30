import { InputHTMLAttributes } from "react";
import { Control, FieldErrors, FieldValues, Path } from "react-hook-form";

import { Maybe } from "api/graphql/generated/graphql";

export interface OptionTypeBase {
  id: string;
  label: string;
}

export interface IFormInputText<
  T extends FieldValues,
  OptionType extends OptionTypeBase
> {
  control: Control<T, unknown>;
  label?: string;
  placeholder?: string;
  name: T[Path<T>];
  type?: string;
  multiline?: boolean;
  maxRows?: string | number;
  minRows?: string | number;
  inputProps?: InputHTMLAttributes<HTMLTextAreaElement>;
  errors?: FieldErrors<T>;
  options: OptionType[];
  onSelect: (item: Maybe<OptionType>) => void;
  disabled?: boolean;
  loading?: boolean;
}
