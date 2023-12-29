import { Control } from "react-hook-form";
import { MentorsQuery, Maybe } from "api/graphql/generated/graphql";

import { IFilterKanban } from "../form/form.types";

export interface IMentorSelection {
  data?: Maybe<MentorsQuery>;
  control: Control<IFilterKanban, unknown>;
}
