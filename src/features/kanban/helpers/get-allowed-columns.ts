import { StudentHomeWorkStatus } from "../../../../../../../Downloads/qa-guru-frontend-develop 2/src/api/graphql/generated/graphql";

export const getAllowedColumns = (title: StudentHomeWorkStatus) => {
  let allowedColumns: string[] = [];

  switch (title) {
    case StudentHomeWorkStatus.New:
      allowedColumns = ["2"];
      break;
    case StudentHomeWorkStatus.InReview:
      allowedColumns = ["3", "4"];
      break;
    case StudentHomeWorkStatus.NotApproved:
      allowedColumns = ["3"];
      break;
    default:
      allowedColumns = [];
  }

  return allowedColumns;
};
