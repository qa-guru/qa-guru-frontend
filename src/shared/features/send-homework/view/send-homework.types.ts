import {
  CreateHomeWorkToCheckMutationFn,
  Maybe,
  UpdateCommentMutationFn,
} from "api/graphql/generated/graphql";

export interface ISendHomeWork {
  createHomeWorkToCheck: CreateHomeWorkToCheckMutationFn;
  updateHomework: UpdateCommentMutationFn;
  loadingCreateHomeWorkToCheck: boolean;
  loadingUpdateHomework: boolean;
  homeWorkId?: Maybe<string>;
}
