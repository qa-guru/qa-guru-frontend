import { Control, FieldValues, Path } from "react-hook-form";

export interface IFormInputDate<T extends FieldValues> {
  control: Control<T, unknown>;
  label?: string;
  name: T[Path<T>];
  onChange?: (value: string) => void;
}
