import { Maybe } from "api/graphql/generated/graphql";

export interface ILectureContent {
  content?: Maybe<string | never[]>;
}
