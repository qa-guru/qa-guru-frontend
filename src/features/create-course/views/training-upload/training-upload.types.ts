import { Maybe, UserDto } from "api/graphql/generated/graphql";

export interface ITrainingUpload {
  user?: Maybe<UserDto>;
  edit?: boolean;
}
