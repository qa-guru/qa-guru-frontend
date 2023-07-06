import { Control } from "react-hook-form";
import { IFilterKanban } from "../../views/Form/Form.types";

export interface ITrainingsByMentorContainer {
  control: Control<IFilterKanban, unknown>;
}
