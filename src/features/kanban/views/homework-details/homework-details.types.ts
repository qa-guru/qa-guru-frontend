import { StudentHomeWorkDto } from "../../../../../../../../Downloads/qa-guru-frontend-develop 2/src/api/graphql/generated/graphql";

export interface IHomeworkDetail {
  card: StudentHomeWorkDto;
  onClose: () => void;
}
