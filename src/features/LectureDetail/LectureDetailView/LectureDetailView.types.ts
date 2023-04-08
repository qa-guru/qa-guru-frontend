import {
  LectureHomeWorkQuery,
  LectureQuery,
} from "../../../api/graphql/generated/graphql";

export interface ILectureDetailView {
  dataLecture: LectureQuery;
  dataLectureHomework: LectureHomeWorkQuery;
  tariffHomework: boolean;
}
