import { SendCommentMutationFn, Maybe } from "api/graphql/generated/graphql";

export interface ISendComment {
  sendComment: SendCommentMutationFn;
  loading: boolean;
  homeworkId?: Maybe<string>;
}
