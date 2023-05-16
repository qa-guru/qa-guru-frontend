import { Control } from "react-hook-form";
import { TrainingsByMentorQuery } from "../../../../../api/graphql/generated/graphql";
import { IFilterKanban } from "../Form.types";

export interface ITrainingSelection {
  data: TrainingsByMentorQuery;
  control: Control<IFilterKanban, any>;
}
