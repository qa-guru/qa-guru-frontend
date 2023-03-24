import { StudentHomeWorkDto } from "../../../api/graphql/generated/graphql";

export interface IHomework {
  editAccess?: boolean;
  dataHomeWorkByLecture: StudentHomeWorkDto;
}
