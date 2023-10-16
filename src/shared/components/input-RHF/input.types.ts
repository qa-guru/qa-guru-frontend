import { InputHTMLAttributes } from "react";
import { Control, FieldValues } from "react-hook-form";

export interface IFormInputProps<T extends FieldValues> {
  control: Control<T, unknown>;
  label?: string;
  placeholder?: string;
  options?: Array<{ value?: string | null; label?: string | null }>;
  name: T[keyof T];
  type?: string;
  multiline?: boolean;
  maxRows?: string | number;
  minRows?: string | number;
  defaultValue?: T[keyof T];
  inputProps?: InputHTMLAttributes<HTMLTextAreaElement>;
  onChange?: (value: string) => void;
  disabled?: boolean;
  content?: Array<{ value: string; label: string }>;
}
