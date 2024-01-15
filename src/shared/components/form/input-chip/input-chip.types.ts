import { Control, FieldValues, Path, UseFormSetValue } from "react-hook-form";

export interface IFormInputChip<T extends FieldValues, OptionType> {
  control: Control<T, unknown>;
  placeholder?: string;
  options?: OptionType[];
  name: T[Path<T>];
  onDelete: (value: OptionType) => void;
  onChange?: (value: OptionType[]) => void;
}
