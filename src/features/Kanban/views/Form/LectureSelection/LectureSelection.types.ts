import { Control } from "react-hook-form";
import { TrainingLecturesQuery } from "../../../../../api/graphql/generated/graphql";
import { IFilterKanban } from "../Form.types";

export default interface ILectureSelection {
  data: TrainingLecturesQuery;
  control: Control<IFilterKanban, any>;
}
