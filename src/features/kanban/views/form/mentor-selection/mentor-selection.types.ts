import { Control } from "react-hook-form";
import { MentorsQuery } from "api/graphql/generated/graphql";
import { IFilterKanban } from "../form.types";

export interface IMentorSelection {
  data?: MentorsQuery | null;
  control: Control<IFilterKanban, unknown>;
}
