import { StudentHomeWorkDto, UserQuery } from "api/graphql/generated/graphql";

export interface IHomework {
  dataHomeWorkByLecture: StudentHomeWorkDto;
  dataUserId: UserQuery;
  hideStatusAndMentor?: boolean;
}
