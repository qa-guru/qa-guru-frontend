import { Dispatch, SetStateAction } from "react";

import {
  UpdateHomeworkMutationFn,
  SendHomeWorkToCheckMutationFn,
  Maybe,
} from "api/graphql/generated/graphql";

export interface IUpdateHomeWork {
  loading: boolean;
  updateHomework: UpdateHomeworkMutationFn;
  sendHomeWorkToCheck?: SendHomeWorkToCheckMutationFn;
  resubmit?: boolean;
  submitLabel?: string;
  refreshHomework?: () => void;
  setOpenHomeWorkEdit: Dispatch<SetStateAction<boolean>>;
  answer?: Maybe<string>;
  homeWorkId?: Maybe<string>;
}
