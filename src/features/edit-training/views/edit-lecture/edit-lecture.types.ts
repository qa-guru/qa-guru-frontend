import { FieldValues } from "react-hook-form";

import {
  InputMaybe,
  LectureHomeWorkQuery,
  LectureQuery,
  Maybe,
  Scalars,
  UpdateLectureMutationFn,
} from "api/graphql/generated/graphql";

export interface IEditLecture {
  updateLecture: UpdateLectureMutationFn;
  dataLectureHomework: LectureHomeWorkQuery;
  dataLecture: LectureQuery;
}

export type LectureInput = {
  content?: Maybe<string>;
  contentHomeWork?: Maybe<string>;
  description?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  homeWorkLevelCode?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["ID"]>;
  speakers?: InputMaybe<Array<InputMaybe<FieldValues>>>;
  subject?: InputMaybe<Scalars["String"]>;
  testGroupId?: InputMaybe<Scalars["ID"]>;
};
