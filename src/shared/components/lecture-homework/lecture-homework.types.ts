import {
  LectureContentDto,
  LectureContentHomeWorkDto,
} from "api/graphql/generated/graphql";

export interface ILectureHomework {
  lectureHomeWork?: (LectureContentHomeWorkDto | LectureContentDto | null)[];
}
