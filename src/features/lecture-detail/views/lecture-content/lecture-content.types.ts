import { LectureContentDto, Maybe } from "api/graphql/generated/graphql";

export interface ILectureContent {
  content?: Maybe<Maybe<LectureContentDto | undefined>[]>;
}
