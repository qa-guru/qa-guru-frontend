import { Control, FieldValues } from "react-hook-form";

export interface ITrainingSelectionByRole<T extends FieldValues> {
  control: Control<T>;
}
