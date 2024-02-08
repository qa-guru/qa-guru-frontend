import { Maybe } from "api/graphql/generated/graphql";

export interface IUpdateCommentContainer {
  id?: Maybe<string>;
  content?: Maybe<string>;
}
