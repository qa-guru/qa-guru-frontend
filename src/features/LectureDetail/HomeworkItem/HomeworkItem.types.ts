import { StudentHomeWorkDto } from "../../../api/graphql/generated/graphql";

export interface IHomeworkItem {
  dataHomeWorkByLecture: StudentHomeWorkDto;
  dataUserId: string;
}
