import { Control } from "react-hook-form";
import { UserIdQuery } from "../../../../../api/graphql/generated/graphql";
import { IFilterKanban } from "../Form.types";

export interface IAssignedToMeSelection {
  data: UserIdQuery;
  control: Control<IFilterKanban, unknown>;
}
