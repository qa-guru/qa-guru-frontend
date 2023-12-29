import { UserDto, Maybe } from "api/graphql/generated/graphql";

export interface ILectureSpeakers {
  speakers?: Maybe<Maybe<UserDto | undefined>[]>;
}
