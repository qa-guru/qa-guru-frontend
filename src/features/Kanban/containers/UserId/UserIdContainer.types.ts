import { Control, FieldValues } from "react-hook-form";

export interface IUserIdContainer<T extends FieldValues> {
  control: Control<T>;
}
