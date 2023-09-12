import React from "react";
import {
  Maybe,
  StudentHomeWorkStatus,
} from "../../../../../api/graphql/generated/graphql";

export interface IButtonEdit {
  openHomeWorkEdit: boolean;
  setOpenHomeWorkEdit: React.Dispatch<React.SetStateAction<boolean>>;
  status: Maybe<StudentHomeWorkStatus>;
  editAccess: boolean;
}
