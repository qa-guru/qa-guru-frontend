import { LockUserMutationFn, Maybe } from "api/graphql/generated/graphql";

export interface ILockUser {
  lockUser: LockUserMutationFn;
  id?: Maybe<string>;
  loading: boolean;
}
