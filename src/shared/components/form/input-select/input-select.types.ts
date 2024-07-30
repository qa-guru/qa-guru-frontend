import { Control, FieldValues, Path } from "react-hook-form";

import { Maybe } from "api/graphql/generated/graphql";

export interface OptionTypeBase {
  id: string;
  label: string;
}

export interface IFormInputSelect<
  T extends FieldValues,
  OptionType extends OptionTypeBase,
  SelectType
> {
  control: Control<T, unknown>;
  placeholder?: string;
  options: OptionType[];
  name: T[Path<T>];
  defaultValue?: T[keyof T];
  onSelect: (item: Maybe<SelectType>) => void;
  disabled?: boolean;
}
