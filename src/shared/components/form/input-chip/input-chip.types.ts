import { Control, FieldValues, Path } from "react-hook-form";

export interface IFormInputChip<T extends FieldValues, OptionType> {
  control: Control<T, unknown>;
  placeholder?: string;
  options?: OptionType[];
  name: T[Path<T>];
  onChange?: (value: OptionType[]) => void;
}
