import { LectureHomeWorkQuery, LectureQuery } from "../../../generated/graphql";

export interface ILectureDetail {
  dataLecture: LectureQuery;
  dataLectureHomeWork: LectureHomeWorkQuery;
}
