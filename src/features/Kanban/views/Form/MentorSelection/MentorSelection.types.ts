import { Control } from "react-hook-form";
import { MentorsQuery } from "../../../../../api/graphql/generated/graphql";
import { IFilterKanban } from "../Form.types";

export interface IMentorSelection<T extends IFilterKanban> {
  data: MentorsQuery;
  control: Control<T>;
}
