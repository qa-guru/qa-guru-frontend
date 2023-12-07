import { Control } from "react-hook-form";

import { IFilterKanban } from "../form/form.types";

export interface ICreationDateToSelection {
  control: Control<IFilterKanban, unknown>;
}
