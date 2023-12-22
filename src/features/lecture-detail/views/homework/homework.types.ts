import { StudentHomeWorkDto, UserQuery } from "api/graphql/generated/graphql";

export interface IHomework {
  dataHomeWorkByLectureAndTraining?: StudentHomeWorkDto | null;
  dataUserId: UserQuery;
  hideMentorAndStudent?: boolean;
}
