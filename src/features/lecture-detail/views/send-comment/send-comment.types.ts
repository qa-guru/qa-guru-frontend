import { SendCommentMutationFn } from "api/graphql/generated/graphql";

export interface ISendComment {
  sendComment: SendCommentMutationFn;
  loading: boolean;
  id?: string | null;
}

export interface ISendCommentContent {
  content: string;
}
