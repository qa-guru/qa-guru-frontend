import type {
  Maybe,
  StudentHomeWorkStatus,
} from "api/graphql/generated/graphql";

export type ReturnForReworkOutcome =
  | {
      kind: "done";
      commentId: Maybe<string>;
      status: Maybe<StudentHomeWorkStatus>;
    }
  | { kind: "comment-failed"; commentId: Maybe<string>; error: unknown }
  | {
      kind: "status-failed";
      commentId: Maybe<string>;
      status: Maybe<StudentHomeWorkStatus>;
      error: unknown;
    };

export interface ReturnForReworkInput {
  homeworkId: string;
  commentId?: Maybe<string>;
}

export interface ReturnForReworkDeps {
  submitComment?: () => Promise<string>;
  notApproved: (homeWorkId: string) => Promise<unknown>;
  fetchStatus: (homeWorkId: string) => Promise<Maybe<StudentHomeWorkStatus>>;
  expectedStatus: StudentHomeWorkStatus;
}

export const runReturnForRework = async (
  input: ReturnForReworkInput,
  deps: ReturnForReworkDeps
): Promise<ReturnForReworkOutcome> => {
  const { homeworkId } = input;
  let commentId = input.commentId ?? null;

  if (!commentId) {
    try {
      commentId = (await deps.submitComment?.()) ?? null;
    } catch (error) {
      return { kind: "comment-failed", commentId: null, error };
    }
  }

  try {
    await deps.notApproved(homeworkId);
    return { kind: "done", commentId, status: deps.expectedStatus };
  } catch (error) {
    const status = await deps.fetchStatus(homeworkId).catch(() => null);
    if (status === deps.expectedStatus) {
      return { kind: "done", commentId, status };
    }
    return { kind: "status-failed", commentId, status, error };
  }
};
