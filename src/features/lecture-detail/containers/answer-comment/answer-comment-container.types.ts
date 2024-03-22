import { Maybe } from "api/graphql/generated/graphql";

export interface IAnswerCommentContainer {
  commentId?: Maybe<string>;
  onReplySuccess?: () => void;
  homeworkId?: string;
}
