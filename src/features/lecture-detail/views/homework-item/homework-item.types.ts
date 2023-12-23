import { StudentHomeWorkDto, UserQuery } from "api/graphql/generated/graphql";

export interface IHomeworkItem {
  dataHomeWorkByLectureAndTraining?: StudentHomeWorkDto | null;
  dataUserId: UserQuery;
  hideMentorAndStudent?: boolean;
}
