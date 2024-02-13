import {
  LectureContentDto,
  LectureContentHomeWorkDto,
  Maybe,
} from "api/graphql/generated/graphql";

export interface ILectureHomework {
  lectureHomeWork?: Maybe<
    Maybe<LectureContentHomeWorkDto | LectureContentDto>[]
  >;
}
