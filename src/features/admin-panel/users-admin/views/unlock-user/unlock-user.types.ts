import {
  Maybe,
  UnlockUserMutationFn,
  UserDto,
} from "api/graphql/generated/graphql";

export interface IUnlockUser {
  unlockUser: UnlockUserMutationFn;
  id: Maybe<string> | undefined;
  user: Maybe<UserDto>;
}
