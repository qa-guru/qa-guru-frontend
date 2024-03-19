import { Maybe } from "api/graphql/generated/graphql";

export interface ILikeCommentContainer {
  id?: Maybe<string>;
  likes: Maybe<Array<string>>;
  userLike?: Maybe<boolean>;
}
