import React from "react";
import { UpdateCommentMutationFn } from "../../../../../api/graphql/generated/graphql";

export interface IUpdateComment {
  updateComment: UpdateCommentMutationFn;
  loading: boolean;
  id: string;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  content: string;
}

export interface IUpdateCommentContent {
  content: string;
}

export interface IUpdateCommentContainer {
  id: string;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  content: string;
  comments: any;
  setComments: React.Dispatch<React.SetStateAction<any>>;
}
