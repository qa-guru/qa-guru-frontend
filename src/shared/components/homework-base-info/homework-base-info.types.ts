import { Maybe, UserDto } from "api/graphql/generated/graphql";

export interface IHomeworkBaseInfo {
  student?: Maybe<UserDto>;
  mentor?: Maybe<UserDto>;
  creationDate: string;
  startCheckingDate?: string;
  endCheckingDate?: string;
  iconSize?: { width: number; height: number };
}
