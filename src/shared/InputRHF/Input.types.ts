import React from "react";
import { Control, FieldValues } from "react-hook-form";

export interface IFormInputProps<T extends FieldValues> {
  control: Control<T>;
  label?: string;
  placeholder?: string;
  options?: string[];
  name: string;
  type?: string;
  multiline?: boolean;
  maxRows?: string | number;
  minRows?: string | number;
  defaultValue?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  content?: Array<{ value: string; label: string }>;
}
