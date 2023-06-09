import { Control, FieldValues } from "react-hook-form";

export interface ITrainingsByMentorContainer<T extends FieldValues> {
  control: Control<T>;
}
