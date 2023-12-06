import { Dispatch, SetStateAction } from "react";
import { Maybe, StudentHomeWorkStatus } from "api/graphql/generated/graphql";

export interface IButtonEdit {
  openHomeWorkEdit: boolean;
  setOpenHomeWorkEdit: Dispatch<SetStateAction<boolean>>;
  status?: Maybe<StudentHomeWorkStatus> | null;
  editAccess: boolean;
}
