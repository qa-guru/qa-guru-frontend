import { Control } from "react-hook-form";
import { IFilterKanban } from "../../views/Form/Form.types";

export interface IUserIdContainer {
  control: Control<IFilterKanban, unknown>;
}
