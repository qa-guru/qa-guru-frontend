import { Control, FieldValues, Path } from "react-hook-form";
import { Maybe } from "api/graphql/generated/graphql";

export interface IFormInputSelect<T extends FieldValues> {
  control: Control<T, unknown>;
  placeholder?: string;
  options?: Array<{ value?: Maybe<string>; label?: Maybe<string> }>;
  name: T[Path<T>];
  defaultValue?: T[keyof T];
  onChange?: (value: string) => void;
  disabled?: boolean;
}
