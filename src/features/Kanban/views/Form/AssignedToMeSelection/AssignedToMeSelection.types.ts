import { Control, FieldValues } from "react-hook-form";
import { UserIdQuery } from "../../../../../api/graphql/generated/graphql";

export interface IAssignedToMeSelection<T extends FieldValues> {
  data: UserIdQuery;
  control: Control<T>;
}
