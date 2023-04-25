import React from "react";
import { SendCommentMutationFn } from "../../../../api/graphql/generated/graphql";

export interface ISendComment {
  sendComment: SendCommentMutationFn;
  loading: boolean;
  id: string;
}

export interface ISendCommentContent {
  content: string;
}
