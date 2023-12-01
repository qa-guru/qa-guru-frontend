import { AnswerCommentMutationFn } from "api/graphql/generated/graphql";

export interface IAnswerComment {
  answerComment: AnswerCommentMutationFn;
  loading: boolean;
  id?: string | null;
}

export interface IAnswerCommentContent {
  content: string;
}
