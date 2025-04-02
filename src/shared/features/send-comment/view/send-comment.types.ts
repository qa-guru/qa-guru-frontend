import {
  SendCommentMutationFn,
  Maybe,
  UpdateCommentMutationFn,
} from "api/graphql/generated/graphql";

export interface ISendComment {
  sendComment: SendCommentMutationFn;
  updateComment: UpdateCommentMutationFn;
  loadingUpdateComment: boolean;
  loadingSendComment: boolean;
  homeworkId?: Maybe<string>;
}
