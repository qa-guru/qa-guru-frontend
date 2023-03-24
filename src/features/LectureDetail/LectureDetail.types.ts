import {
  HomeWorkByLectureQuery,
  LectureHomeWorkQuery,
  LectureQuery,
  UserQuery,
} from "../../api/graphql/generated/graphql";

export interface ILectureDetail {
  dataLecture: LectureQuery;
  dataLectureHomework: LectureHomeWorkQuery;
  dataHomeWorkByLecture: HomeWorkByLectureQuery;
  tariffHomework: boolean;
  hasHomework: boolean;
}
