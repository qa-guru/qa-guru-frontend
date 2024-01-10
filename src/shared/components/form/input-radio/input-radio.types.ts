import { Control, FieldValues, Path } from "react-hook-form";

export interface IFormInputRadio<T extends FieldValues> {
  control: Control<T, unknown>;
  label?: string;
  name: T[Path<T>];
  options?: Array<{ value: string; label: string }>;
}
