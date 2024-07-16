import { Control } from "react-hook-form";

import { IFilterHomeworks } from "../homeworks-other-students-form/homeworks-other-students-form.types";

export const options = [
  {
    id: "DESC",
    label: "Сначала новые",
  },
  {
    id: "ASC",
    label: "Сначала старые",
  },
];

export interface ISortByCreationDate {
  control: Control<IFilterHomeworks, unknown>;
}
