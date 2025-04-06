import {
  CreateHomeWorkToCheckMutationFn,
  Maybe,
  SendHomeWorkToCheckMutationFn,
  UpdateCommentMutationFn,
} from "api/graphql/generated/graphql";

export interface ISendHomeWork {
  createHomeWorkToCheck: CreateHomeWorkToCheckMutationFn;
  updateHomework: UpdateCommentMutationFn;
  sendHomeWorkToCheck: SendHomeWorkToCheckMutationFn;
  loadingCreateHomeWorkToCheck: boolean;
  loadingUpdateHomework: boolean;
  loadingSendHomeWorkToCheck: boolean;
  homeWorkId?: Maybe<string>;
}
