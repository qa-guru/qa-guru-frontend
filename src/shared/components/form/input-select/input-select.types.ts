import { Control, FieldValues } from "react-hook-form";

export interface IFormInputSelect<T extends FieldValues> {
  control: Control<T, unknown>;
  placeholder?: string;
  options?: Array<{ value?: string | null; label?: string | null }>;
  name: T[keyof T];
  defaultValue?: T[keyof T];
  onChange?: (value: string) => void;
  disabled?: boolean;
}
