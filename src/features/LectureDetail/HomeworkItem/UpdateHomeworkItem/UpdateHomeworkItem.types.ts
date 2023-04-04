import React from "react";
import { UpdateHomeworkMutationFn } from "../../../../api/graphql/generated/graphql";

export interface IUpdateHomeWork {
  loading: boolean;
  updateHomework: UpdateHomeworkMutationFn;
  setOpenHomeWorkEdit: React.Dispatch<React.SetStateAction<boolean>>;
  answer: string | null | undefined;
  id: string | null | undefined;
}

export interface IUpdateHomeworkContent {
  content: string;
}

export interface IUpdateHomeworkContainer {
  setOpenHomeWorkEdit: React.Dispatch<React.SetStateAction<boolean>>;
  answer: string | null | undefined;
  id: string | null | undefined;
}
