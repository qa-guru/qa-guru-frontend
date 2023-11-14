import { HomeWorkQuery, UserIdQuery } from "api/graphql/generated/graphql";

export interface IHomeworkDescriptionFull {
  data: HomeWorkQuery;
  dataUserId: UserIdQuery;
}
