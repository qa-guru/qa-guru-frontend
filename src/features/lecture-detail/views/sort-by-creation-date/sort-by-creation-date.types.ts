import { Control } from "react-hook-form";

import { IFilterHomeworks } from "../form/form.types";

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
