import type { FieldValues } from "react-hook-form";

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
  description?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  homeWorkLevelCode?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  speakers?: InputMaybe<Array<InputMaybe<FieldValues>>>;
  subject?: InputMaybe<Scalars["String"]["input"]>;
  testGroupId?: InputMaybe<Scalars["ID"]["input"]>;
};
