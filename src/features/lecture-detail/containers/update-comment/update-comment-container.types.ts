import { Dispatch, SetStateAction } from "react";
import { Maybe } from "api/graphql/generated/graphql";

export interface IUpdateCommentContainer {
  id?: Maybe<string>;
  setSelectedComment: Dispatch<SetStateAction<Maybe<string | undefined>>>;
  content?: Maybe<string>;
}
