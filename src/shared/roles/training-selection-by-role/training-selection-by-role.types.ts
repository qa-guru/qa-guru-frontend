import { Control } from "react-hook-form";

import { IFilterKanban } from "../../../features/kanban/views/form/form.types";

export interface ITrainingSelectionByRole {
  control: Control<IFilterKanban, unknown>;
}
