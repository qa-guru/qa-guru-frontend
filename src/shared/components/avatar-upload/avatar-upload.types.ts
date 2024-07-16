import { Maybe, UserDto } from "api/graphql/generated/graphql";

export interface IAvatarUpload {
  user?: Maybe<UserDto>;
  edit?: boolean;
}
