import { StudentHomeWorkStatus, Maybe } from "api/graphql/generated/graphql";

export interface IStatusText {
  status?: Maybe<StudentHomeWorkStatus>;
}
