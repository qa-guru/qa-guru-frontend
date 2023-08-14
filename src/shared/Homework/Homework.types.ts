import {
  HomeWorkByLectureQuery,
  StudentHomeWorkDto,
  UserQuery,
} from "../../api/graphql/generated/graphql";

export interface IHomework {
  dataHomeWorkByLecture: StudentHomeWorkDto & HomeWorkByLectureQuery;
  dataUserId: UserQuery;
}
