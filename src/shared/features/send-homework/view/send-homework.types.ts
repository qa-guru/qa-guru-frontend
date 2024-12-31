import {
  CreateHomeWorkToCheckMutationFn,
  Maybe,
} from "api/graphql/generated/graphql";

export interface ISendHomeWork {
  createHomeWorkToCheck: CreateHomeWorkToCheckMutationFn;
  loading: boolean;
  homeWorkId?: Maybe<string>;
}
