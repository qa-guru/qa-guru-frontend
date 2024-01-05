import {
  LectureContentDto,
  LectureContentHomeWorkDto,
  Maybe,
} from "api/graphql/generated/graphql";

export interface IContentSerialization {
  content?: Maybe<
    (LectureContentHomeWorkDto | LectureContentDto | undefined)[]
  >;
}
