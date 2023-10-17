import { Dispatch, SetStateAction } from "react";
import { UpdateCommentMutationFn } from "api/graphql/generated/graphql";

export interface IUpdateComment {
  updateComment: UpdateCommentMutationFn;
  loading: boolean;
  id: string;
  setSelectedIndex: Dispatch<SetStateAction<number>>;
  content: string;
}

export interface IUpdateCommentContent {
  content: string;
}
