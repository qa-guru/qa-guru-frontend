import { Control } from "react-hook-form";
import { Maybe, MentorsQuery } from "api/graphql/generated/graphql";

import { IFilterKanban } from "../form/form.types";

export interface IMentorSelection {
  data?: Maybe<MentorsQuery>;
  control: Control<IFilterKanban, unknown>;
  loading: boolean;
}
