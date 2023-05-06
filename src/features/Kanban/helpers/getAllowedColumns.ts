import { StudentHomeWorkStatus } from "../../../api/graphql/generated/graphql";

export const getAllowedColumns = (title: StudentHomeWorkStatus) => {
  if (title === StudentHomeWorkStatus.New) {
    return ["2"];
  } else if (title === StudentHomeWorkStatus.InReview) {
    return ["3", "4"];
  } else if (title === StudentHomeWorkStatus.NotApproved) {
    return ["3"];
  }
  return [];
};
