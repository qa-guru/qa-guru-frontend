import { Control } from "react-hook-form";
import { IFilterKanban } from "../Form.types";

export interface ICreationDateFromSelection<T extends IFilterKanban> {
  control: Control<T>;
}
