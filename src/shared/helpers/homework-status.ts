import { Maybe, StudentHomeWorkStatus } from "api/graphql/generated/graphql";

export const STUDENT_EDITABLE_HOMEWORK_STATUSES: ReadonlyArray<StudentHomeWorkStatus> =
  [StudentHomeWorkStatus.New, StudentHomeWorkStatus.NotApproved];

export const isHomeworkStudentEditable = (
  status?: Maybe<StudentHomeWorkStatus>
): status is StudentHomeWorkStatus =>
  status != null && STUDENT_EDITABLE_HOMEWORK_STATUSES.includes(status);
