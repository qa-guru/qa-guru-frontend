import { StudentHomeWorkDto } from "../../../../api/graphql/generated/graphql";

export interface IHomeworkDetail {
  card: StudentHomeWorkDto;
  onClose: () => void;
  showHomeworkDetails: boolean;
}
