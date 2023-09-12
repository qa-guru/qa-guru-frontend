import {
  StudentHomeWorkDto,
  UserIdQuery,
} from "../../../../api/graphql/generated/graphql";

export interface IModalHomeworksOtherStudents {
  item: StudentHomeWorkDto;
  dataUserId: UserIdQuery;
}
