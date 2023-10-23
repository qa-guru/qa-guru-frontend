import { StudentHomeWorkDto, UserQuery } from "api/graphql/generated/graphql";

export interface IHomework {
  dataHomeWorkByLecture?: StudentHomeWorkDto | null;
  dataUserId: UserQuery;
}
