import { Maybe, UserDto } from "api/graphql/generated/graphql";

export interface IMediaLinks {
  user?: Maybe<UserDto>;
}
