import { UpdateCommentMutationFn, Maybe } from "api/graphql/generated/graphql";

export interface IUpdateComment {
  updateComment: UpdateCommentMutationFn;
  loading: boolean;
  id?: Maybe<string>;
  content?: Maybe<string>;
}
