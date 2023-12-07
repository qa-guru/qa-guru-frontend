import { Control } from "react-hook-form";
import { TrainingLecturesQuery } from "api/graphql/generated/graphql";

import { IFilterKanban } from "../form/form.types";

export default interface ILectureSelection {
  data: TrainingLecturesQuery;
  control: Control<IFilterKanban, unknown>;
}
