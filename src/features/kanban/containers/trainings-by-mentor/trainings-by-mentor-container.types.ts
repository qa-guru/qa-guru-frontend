import { Control } from "react-hook-form";
import { IFilterKanban } from "../../views/form/form.types";

export interface ITrainingsByMentorContainer {
  control: Control<IFilterKanban, unknown>;
}
