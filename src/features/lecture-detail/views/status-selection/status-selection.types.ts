import { Control } from "react-hook-form";

import { IFilterHomeworks } from "../form/form.types";

export interface IStatusSelection {
  control: Control<IFilterHomeworks, unknown>;
}
