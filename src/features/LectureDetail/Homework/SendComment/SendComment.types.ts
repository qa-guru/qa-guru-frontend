import React from "react";
import { SendCommentMutationFn } from "../../../../api/graphql/generated/graphql";

export interface ISendComment {
  sendComment: SendCommentMutationFn;
  loading: boolean;
  setAddComment: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
}

export interface ISendCommentContent {
  content: string;
}

export interface ISendHomeworkContainer {
  setAddComment: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
}
