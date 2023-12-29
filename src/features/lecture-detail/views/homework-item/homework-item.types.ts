import {
  StudentHomeWorkDto,
  UserQuery,
  Maybe,
} from "api/graphql/generated/graphql";

export interface IHomeworkItem {
  dataHomeWorkByLectureAndTraining?: Maybe<StudentHomeWorkDto>;
  dataUserId: UserQuery;
  hideMentorAndStudent?: boolean;
}
