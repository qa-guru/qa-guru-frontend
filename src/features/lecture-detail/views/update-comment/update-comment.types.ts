import { Dispatch, SetStateAction } from "react";
import { UpdateCommentMutationFn } from "api/graphql/generated/graphql";

export interface IUpdateComment {
  updateComment: UpdateCommentMutationFn;
  loading: boolean;
  id?: string | null;
  setSelectedIndex: Dispatch<SetStateAction<number>>;
  content?: string | null;
}

export interface IUpdateCommentContent {
  content: string;
}
