import {
  HomeWorkByLectureQuery,
  LectureHomeWorkQuery,
  LectureQuery,
} from "../../api/graphql/generated/graphql";

export interface ILectureDetail {
  dataLecture: LectureQuery;
  dataLectureHomework: LectureHomeWorkQuery;
  dataHomeWorkByLecture: HomeWorkByLectureQuery;
  hasHomework: boolean;
}
