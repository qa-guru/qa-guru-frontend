import { ProfileQuery, UserQuery } from "api/graphql/generated/graphql";

export interface IUserInfo {
  data: UserQuery;
  dataProfile: ProfileQuery;
}
