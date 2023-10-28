import { Control, FieldValues } from "react-hook-form";

export interface IFormInputRadio<T extends FieldValues> {
  control: Control<T, unknown>;
  label?: string;
  name: T[keyof T];
  content?: Array<{ value: string; label: string }>;
}
