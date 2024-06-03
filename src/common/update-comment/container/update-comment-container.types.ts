import { Maybe } from "api/graphql/generated/graphql";

export interface IUpdateCommentContainer {
  commentId?: Maybe<string>;
  content?: Maybe<string>;
}
