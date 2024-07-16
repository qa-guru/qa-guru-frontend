import { Control } from "react-hook-form";

import { IFilterHomeworks } from "../homeworks-other-students-form/homeworks-other-students-form.types";

export interface IStatusSelection {
  control: Control<IFilterHomeworks, unknown>;
}
