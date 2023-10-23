import { StudentHomeWorkDto, UserIdQuery } from "api/graphql/generated/graphql";

export interface IModalHomeworksOtherStudents {
  item?: StudentHomeWorkDto | null;
  dataUserId: UserIdQuery;
}
