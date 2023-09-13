import { Control } from "react-hook-form";
import { IFilterKanban } from "../form.types";

export interface ICreationDateToSelection {
  control: Control<IFilterKanban, unknown>;
}
