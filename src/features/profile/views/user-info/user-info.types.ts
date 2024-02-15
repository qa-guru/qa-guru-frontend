import { Maybe, UserDto } from "api/graphql/generated/graphql";

export interface IUserInfo {
  user?: Maybe<UserDto>;
}
