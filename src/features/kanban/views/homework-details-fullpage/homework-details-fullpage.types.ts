import { HomeWorkQuery, UserIdQuery } from "api/graphql/generated/graphql";

export interface IHomeworkDescriptionFullpage {
  data: HomeWorkQuery;
  dataUserId: UserIdQuery;
}
