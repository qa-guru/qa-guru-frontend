import {
  StudentHomeWorkDto,
  UserQuery,
  Maybe,
} from "api/graphql/generated/graphql";

export interface IHomework {
  dataHomeWorkByLectureAndTraining?: Maybe<StudentHomeWorkDto>;
  dataUserId: UserQuery;
  hideMentorAndStudent?: boolean;
}
