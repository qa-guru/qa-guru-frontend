import { Maybe, UserDto } from "api/graphql/generated/graphql";

export interface IUserInfoMobile {
  creationDate: number;
  user?: Maybe<UserDto>;
}
