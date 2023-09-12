import { Control } from "react-hook-form";
import { IFilterKanban } from "../form.types";

export interface ICreationDateFromSelection {
  control: Control<IFilterKanban, unknown>;
}
