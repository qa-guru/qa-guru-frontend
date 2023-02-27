import {
  HomeWorkByLectureQuery,
  LectureHomeWorkQuery,
  LectureQuery,
} from "../../api/graphql/generated/graphql";

export interface ILectureDetail {
  dataLecture: LectureQuery;
  dataHomeWorkByLecture: HomeWorkByLectureQuery;
  dataLectureHomework: LectureHomeWorkQuery;
}
