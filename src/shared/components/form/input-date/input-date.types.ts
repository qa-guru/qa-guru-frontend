import { Control, FieldValues } from "react-hook-form";

export interface IFormInputDate<T extends FieldValues> {
  control: Control<T, unknown>;
  label?: string;
  name: T[keyof T];
  onChange?: (value: string) => void;
}
