import { StudentHomeWorkStatus } from "api/graphql/generated/graphql";

export interface IStatusText {
  status?: StudentHomeWorkStatus | null;
}
