import { DeleteCommentMutationFn, Maybe } from "api/graphql/generated/graphql";

export interface IDeleteComment {
  id?: Maybe<string>;
  deleteComment: DeleteCommentMutationFn;
  loading: boolean;
}
