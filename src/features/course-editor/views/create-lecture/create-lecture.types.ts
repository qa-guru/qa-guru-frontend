import {
  InputMaybe,
  LectureContentHomeWorkInput,
  LectureContentInput,
  LectureHomeWorkQuery,
  LectureQuery,
  Scalars,
  UpdateLectureMutationFn,
} from "api/graphql/generated/graphql";
import { FieldValues } from "react-hook-form";

export interface IEditLecture {
  updateLecture: UpdateLectureMutationFn;
  dataLectureHomework: LectureHomeWorkQuery;
  dataLecture: LectureQuery;
}

export type LectureInput = {
  content?: InputMaybe<Array<InputMaybe<LectureContentInput>>>;
  contentHomeWork?: InputMaybe<Array<InputMaybe<LectureContentHomeWorkInput>>>;
  description?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  homeWorkLevelCode?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["ID"]>;
  speakers?: InputMaybe<Array<InputMaybe<FieldValues>>>;
  subject?: InputMaybe<Scalars["String"]>;
};
