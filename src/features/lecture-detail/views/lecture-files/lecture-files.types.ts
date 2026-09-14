import { LectureAttachmentWithId } from "shared/helpers";

export interface ILectureFiles {
  lectureId?: string;
  files?: LectureAttachmentWithId[];
  title?: string;
  standalone?: boolean;
}
