import { UpdateCommentMutationFn, Maybe } from "api/graphql/generated/graphql";

export interface IUpdateComment {
  updateComment: UpdateCommentMutationFn;
  loading: boolean;
  commentId?: Maybe<string>;
  content?: Maybe<string>;
}
