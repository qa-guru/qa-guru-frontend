import { Dispatch, SetStateAction } from "react";

export interface IUpdateHomeworkContainer {
  setOpenHomeWorkEdit: Dispatch<SetStateAction<boolean>>;
  answer?: string | null;
  id?: string | null;
}
