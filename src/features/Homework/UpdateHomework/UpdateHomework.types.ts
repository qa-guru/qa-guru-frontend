import {
  HomeWorkByStudentAndLectureIdQuery,
  UpdateHomeworkMutationFn,
} from "../../../generated/graphql";
import React from "react";

export interface IUpdateHomeWork {
  loading: boolean;
  updateHomework: UpdateHomeworkMutationFn;
  setOpenHomeWorkEdit: React.Dispatch<React.SetStateAction<Boolean>>;
  dataHomeworkId: HomeWorkByStudentAndLectureIdQuery;
}

export interface IUpdateHomeworkContent {
  content: string;
}
