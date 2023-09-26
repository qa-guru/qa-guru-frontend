import { Control } from "react-hook-form";
import { TrainingLecturesQuery } from "../../../../../../../../../Downloads/qa-guru-frontend-develop 2/src/api/graphql/generated/graphql";
import { IFilterKanban } from "../form.types";

export default interface ILectureSelection {
  data: TrainingLecturesQuery;
  control: Control<IFilterKanban, unknown>;
}
