import { Dispatch, SetStateAction } from "react";
import { UpdateHomeworkMutationFn } from "api/graphql/generated/graphql";

export interface IUpdateHomeWork {
  loading: boolean;
  updateHomework: UpdateHomeworkMutationFn;
  setOpenHomeWorkEdit: Dispatch<SetStateAction<boolean>>;
  answer?: string | null;
  id?: string | null;
}
