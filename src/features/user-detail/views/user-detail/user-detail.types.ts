import { ProfileByIdQuery, UserByIdQuery } from "api/graphql/generated/graphql";

export interface IUserDetail {
  data: UserByIdQuery;
  dataProfileById: ProfileByIdQuery;
}
