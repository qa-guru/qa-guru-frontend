import { Maybe, UnlockUserMutationFn } from "api/graphql/generated/graphql";

export interface IUnlockUser {
  unlockUser: UnlockUserMutationFn;
  id: Maybe<string> | undefined;
  loading: boolean;
}
