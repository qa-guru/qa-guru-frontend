import React from "react";
import { StudentHomeWorkStatus } from "../../../../../api/graphql/generated/graphql";

export interface IHomeworkContent {
  status: StudentHomeWorkStatus;
  answer: string;
  openHomeWorkEdit: boolean;
  setOpenHomeWorkEdit: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
}
