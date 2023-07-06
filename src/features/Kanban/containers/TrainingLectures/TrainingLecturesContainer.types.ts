import { Control } from "react-hook-form";
import { IFilterKanban } from "../../views/Form/Form.types";

export interface ITrainingLecturesContainer {
  control: Control<IFilterKanban, unknown>;
}
