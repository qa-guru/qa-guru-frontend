import { Control } from "react-hook-form";
import { TrainingLecturesQuery } from "../../../../../api/graphql/generated/graphql";
import { IFilterKanban } from "../Form.types";

export default interface ILectureSelection<T extends IFilterKanban> {
  data: TrainingLecturesQuery;
  control: Control<T>;
}
