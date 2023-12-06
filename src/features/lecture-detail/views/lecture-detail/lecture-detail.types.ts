import {
  LectureHomeWorkQuery,
  LectureQuery,
} from "api/graphql/generated/graphql";

export interface ILectureDetail {
  dataLecture: LectureQuery;
  dataLectureHomework?: LectureHomeWorkQuery | null;
  tariffHomework: boolean;
}
