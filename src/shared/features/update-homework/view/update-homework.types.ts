import { Dispatch, SetStateAction } from "react";

import { UpdateHomeworkMutationFn, Maybe } from "api/graphql/generated/graphql";

export interface IUpdateHomeWork {
  loading: boolean;
  updateHomework: UpdateHomeworkMutationFn;
  setOpenHomeWorkEdit: Dispatch<SetStateAction<boolean>>;
  answer?: Maybe<string>;
  id?: Maybe<string>;
}
