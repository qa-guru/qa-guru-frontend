import { Dispatch, SetStateAction } from "react";
import { StudentHomeWorkStatus } from "api/graphql/generated/graphql";

export interface IHomeworkContent {
  status?: StudentHomeWorkStatus | null;
  answer?: string | null;
  openHomeWorkEdit: boolean;
  setOpenHomeWorkEdit: Dispatch<SetStateAction<boolean>>;
  id?: string | null;
}
