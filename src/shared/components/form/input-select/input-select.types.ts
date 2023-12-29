import { Control, FieldValues } from "react-hook-form";
import { Maybe } from "api/graphql/generated/graphql";

export interface IFormInputSelect<T extends FieldValues> {
  control: Control<T, unknown>;
  placeholder?: string;
  options?: Array<{ value?: Maybe<string>; label?: Maybe<string> }>;
  name: T[keyof T];
  defaultValue?: T[keyof T];
  onChange?: (value: string) => void;
  disabled?: boolean;
}
