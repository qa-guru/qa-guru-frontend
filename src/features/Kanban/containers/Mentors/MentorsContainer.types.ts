import { Control, FieldValues } from "react-hook-form";

export interface IMentorsContainer<T extends FieldValues> {
  control: Control<T>;
}
