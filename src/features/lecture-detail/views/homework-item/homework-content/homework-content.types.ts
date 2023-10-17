import { Dispatch, SetStateAction } from "react";
import { StudentHomeWorkStatus } from "api/graphql/generated/graphql";

export interface IHomeworkContent {
  status: StudentHomeWorkStatus;
  answer: string;
  openHomeWorkEdit: boolean;
  setOpenHomeWorkEdit: Dispatch<SetStateAction<boolean>>;
  id: string;
}
