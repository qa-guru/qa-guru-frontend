import { Control, FieldValues } from "react-hook-form";

export interface ITrainingLecturesContainer<T extends FieldValues> {
  control: Control<T>;
}
