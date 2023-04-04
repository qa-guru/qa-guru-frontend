import {
  HomeWorksByLectureIdQuery,
  UserQuery,
} from "../../../api/graphql/generated/graphql";

export interface IHomeworksOtherStudents {
  data: HomeWorksByLectureIdQuery;
  fetchMore: any;
  dataUserId: UserQuery;
}
