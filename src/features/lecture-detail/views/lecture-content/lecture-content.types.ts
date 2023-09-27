import { LectureContentDto } from "api/graphql/generated/graphql";

export interface ILectureContent {
  content: (LectureContentDto | null | undefined)[];
}
