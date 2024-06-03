import { Dispatch, SetStateAction } from "react";
import { StudentHomeWorkStatus, Maybe } from "api/graphql/generated/graphql";

export interface IHomeworkContent {
  status?: Maybe<StudentHomeWorkStatus>;
  answer?: Maybe<string>;
  openHomeWorkEdit: boolean;
  setOpenHomeWorkEdit: Dispatch<SetStateAction<boolean>>;
  id?: Maybe<string>;
}
