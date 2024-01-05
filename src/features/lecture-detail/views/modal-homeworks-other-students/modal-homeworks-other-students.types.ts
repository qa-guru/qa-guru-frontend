import {
  StudentHomeWorkDto,
  UserIdQuery,
  Maybe,
} from "api/graphql/generated/graphql";

export interface IModalHomeworksOtherStudents {
  item?: Maybe<StudentHomeWorkDto>;
  dataUserId: UserIdQuery;
}
