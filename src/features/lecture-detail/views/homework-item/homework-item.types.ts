import { StudentHomeWorkDto, UserQuery } from "api/graphql/generated/graphql";

export interface IHomeworkItem {
  dataHomeWorkByLecture?: StudentHomeWorkDto | null;
  dataUserId: UserQuery;
}
