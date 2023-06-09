import { Control, FieldValues } from "react-hook-form";

export interface ITrainingsContainer<T extends FieldValues> {
  control: Control<T>;
}
