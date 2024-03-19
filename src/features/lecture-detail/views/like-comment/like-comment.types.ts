import { LikeCommentMutationFn, Maybe } from "api/graphql/generated/graphql";

export interface ILikeComment {
  id?: Maybe<string>;
  likes: Maybe<Array<string>>;
  likeComment: LikeCommentMutationFn;
  userLike?: Maybe<boolean>;
}
