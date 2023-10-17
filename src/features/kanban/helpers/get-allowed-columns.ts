import { StudentHomeWorkStatus } from "api/graphql/generated/graphql";
import { STATUS_COLUMN } from "../constants";

export const getAllowedColumns = (title: StudentHomeWorkStatus) => {
  let allowedColumns: string[] = [];

  switch (title) {
    case StudentHomeWorkStatus.New:
      allowedColumns = [STATUS_COLUMN.IN_REVIEW];
      break;
    case StudentHomeWorkStatus.InReview:
      allowedColumns = [STATUS_COLUMN.APPROVED, STATUS_COLUMN.NOT_APPROVED];
      break;
    case StudentHomeWorkStatus.NotApproved:
      allowedColumns = [STATUS_COLUMN.APPROVED];
      break;
    default:
      allowedColumns = [];
  }

  return allowedColumns;
};
