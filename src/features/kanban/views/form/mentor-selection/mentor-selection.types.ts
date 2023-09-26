import { Control } from "react-hook-form";
import { MentorsQuery } from "../../../../../../../../../Downloads/qa-guru-frontend-develop 2/src/api/graphql/generated/graphql";
import { IFilterKanban } from "../form.types";

export interface IMentorSelection {
  data: MentorsQuery;
  control: Control<IFilterKanban, unknown>;
}
