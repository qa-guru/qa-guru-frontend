import type { Maybe } from "api/graphql/generated/graphql";

import type { SubmitHomeworkCommentInput } from "../submit-homework-comment";

export interface ISendComment {
  submitComment: (
    input: Omit<SubmitHomeworkCommentInput, "homeworkId">
  ) => Promise<{ commentId: string }>;
  loading?: boolean;
  content?: Maybe<string>;
  commentId?: Maybe<string>;
  onSuccess?: () => void;
  onCancel?: () => void;
  hideCancel?: boolean;
}
