import {
  LectureHomeWorkQuery,
  LectureQuery,
  Maybe,
} from "api/graphql/generated/graphql";

export interface ILectureDetail {
  dataLecture: LectureQuery;
  dataLectureHomework?: Maybe<LectureHomeWorkQuery>;
  tariffHomework: boolean;
}
