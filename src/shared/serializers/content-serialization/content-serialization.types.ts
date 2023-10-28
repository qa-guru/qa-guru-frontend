import {
  LectureContentDto,
  LectureContentHomeWorkDto,
} from "api/graphql/generated/graphql";

export interface IContentSerialization {
  content?:
    | (LectureContentHomeWorkDto | LectureContentDto | null | undefined)[]
    | null;
}
