import { AnswerCommentMutationFn, Maybe } from "api/graphql/generated/graphql";

export interface IAnswerComment {
  answerComment: AnswerCommentMutationFn;
  loading: boolean;
  id?: Maybe<string>;
}

export interface IAnswerCommentContent {
  content: string;
}
