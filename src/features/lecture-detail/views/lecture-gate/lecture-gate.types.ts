import { LectureScheduleSlot } from "shared/helpers";

export interface ILectureGate {
  slot?: LectureScheduleSlot | null;
  lectureMissing?: boolean;
}
