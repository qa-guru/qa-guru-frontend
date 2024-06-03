import { Maybe, StudentHomeWorkStatus } from "api/graphql/generated/graphql";

export interface IStatusSelect {
  currentStatus?: Maybe<StudentHomeWorkStatus>;
  homeworkId?: Maybe<string>;
}
