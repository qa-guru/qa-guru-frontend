import { Dispatch, SetStateAction } from "react";
import { UpdateCommentMutationFn, Maybe } from "api/graphql/generated/graphql";

export interface IUpdateComment {
  updateComment: UpdateCommentMutationFn;
  loading: boolean;
  id?: Maybe<string>;
  setSelectedComment: Dispatch<SetStateAction<Maybe<string | undefined>>>;
  content?: Maybe<string>;
}
