import {
  LockUserMutationFn,
  Maybe,
  UserDto,
} from "api/graphql/generated/graphql";

export interface ILockUser {
  lockUser: LockUserMutationFn;
  id: Maybe<string> | undefined;
  user: Maybe<UserDto>;
}
