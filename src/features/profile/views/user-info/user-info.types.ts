import { Maybe, ProfileDto, UserDto } from "api/graphql/generated/graphql";

export interface IUserInfo {
  user?: Maybe<UserDto>;
  profile?: Maybe<ProfileDto>;
}
