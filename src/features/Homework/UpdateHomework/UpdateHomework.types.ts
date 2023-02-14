import { UpdateHomeworkMutationFn } from "../../../generated/graphql";
import React from "react";

export interface IUpdateHomeWork {
  loading: boolean;
  updateHomeWork: UpdateHomeworkMutationFn;
  setUpdateHomeworkAnswer: React.Dispatch<React.SetStateAction<Boolean>>;
}

export interface IUpdateHomeworkContent {
  content: string;
}
