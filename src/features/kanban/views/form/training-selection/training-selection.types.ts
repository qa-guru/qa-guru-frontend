import { Control } from "react-hook-form";

import { IFilterKanban } from "../form.types";

export interface ITrainingSelection {
  control: Control<IFilterKanban, unknown>;
}
