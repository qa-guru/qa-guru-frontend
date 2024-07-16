import { Maybe } from "api/graphql/generated/graphql";

export interface ILectureDescription {
  description?: Maybe<Array<Maybe<string>>>;
}
