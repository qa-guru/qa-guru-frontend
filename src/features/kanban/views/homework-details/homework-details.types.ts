import { StudentHomeWorkDto } from "api/graphql/generated/graphql";

export interface IHomeworkDescription {
  card: StudentHomeWorkDto;
  onClose: () => void;
}
