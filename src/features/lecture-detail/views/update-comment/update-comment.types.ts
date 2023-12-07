import { Dispatch, SetStateAction } from "react";
import { UpdateCommentMutationFn } from "api/graphql/generated/graphql";

export interface IUpdateComment {
  updateComment: UpdateCommentMutationFn;
  loading: boolean;
  id?: string | null;
  setSelectedComment: Dispatch<SetStateAction<string | null | undefined>>;
  content?: string | null;
}

export interface IUpdateCommentContent {
  content?: string | null;
}
