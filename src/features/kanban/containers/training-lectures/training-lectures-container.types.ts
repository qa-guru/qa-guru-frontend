import { Control } from "react-hook-form";
import { IFilterKanban } from "../../views/form/form.types";

export interface ITrainingLecturesContainer {
  control: Control<IFilterKanban, unknown>;
  isDisabled?: boolean;
}
