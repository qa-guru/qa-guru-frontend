import {
  LectureHomeWorkQuery,
  LectureQuery,
  SendHomeWorkToCheckMutationFn,
} from "../../../generated/graphql";

export interface ILectureDetail {
  dataLecture: LectureQuery;
  dataLectureHomeWork: LectureHomeWorkQuery;
  sendHomeWorkToCheck: SendHomeWorkToCheckMutationFn;
  loadingSendHomeWorkToCheck: boolean;
}
