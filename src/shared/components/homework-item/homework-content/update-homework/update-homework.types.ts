import React from "react";
import { UpdateHomeworkMutationFn } from "api/graphql/generated/graphql";

export interface IUpdateHomeWork {
  loading: boolean;
  updateHomework: UpdateHomeworkMutationFn;
  setOpenHomeWorkEdit: React.Dispatch<React.SetStateAction<boolean>>;
  answer: string;
  id: string;
}

export interface IUpdateHomeworkContent {
  content: string;
}
