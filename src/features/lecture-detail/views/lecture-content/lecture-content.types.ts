import { Maybe } from "api/graphql/generated/graphql";
import { LectureAttachmentWithId } from "shared/helpers";

export interface ILectureContent {
  content?: Maybe<string | never[]>;
  lectureId?: string;
  files?: LectureAttachmentWithId[];
}
