import {
  Maybe,
  UpdateUserMutationFn,
  UserDto,
} from "api/graphql/generated/graphql";

export interface IEditProfile {
  user?: Maybe<UserDto>;
  updateUser: UpdateUserMutationFn;
}
