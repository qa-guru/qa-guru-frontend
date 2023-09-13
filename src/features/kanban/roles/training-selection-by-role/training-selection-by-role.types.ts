import { Control } from "react-hook-form";
import { IFilterKanban } from "../../views/form/form.types";

export interface ITrainingSelectionByRole {
  control: Control<IFilterKanban, unknown>;
}
