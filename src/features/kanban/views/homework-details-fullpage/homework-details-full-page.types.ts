import { HomeWorkQuery, UserIdQuery } from "api/graphql/generated/graphql";

export interface IHomeworkDescriptionFullPage {
  data: HomeWorkQuery;
  dataUserId: UserIdQuery;
}
