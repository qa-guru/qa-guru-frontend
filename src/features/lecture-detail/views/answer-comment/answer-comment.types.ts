import {
  AnswerCommentMutationFn,
  Maybe,
  UserQuery,
} from "api/graphql/generated/graphql";

export interface IAnswerComment {
  answerComment: AnswerCommentMutationFn;
  loading: boolean;
  id?: Maybe<string>;
  dataUser?: UserQuery;
  onReplySuccess?: () => void;
}

export interface IAnswerCommentContent {
  content: string;
}
