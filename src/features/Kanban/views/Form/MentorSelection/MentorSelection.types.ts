import { Control } from "react-hook-form";
import { MentorsQuery } from "../../../../../api/graphql/generated/graphql";
import { IFilterKanban } from "../Form.types";

export interface IMentorSelection {
  data: MentorsQuery;
  control: Control<IFilterKanban, unknown>;
}
