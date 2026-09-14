import { TestGroupDto } from "api/graphql/generated/graphql";
import { LectureAttachmentWithId } from "shared/helpers";

export interface IHomeworkSection {
  lectureHomeWork: string;
  view: string;
  onKanbanView: () => void;
  onListView: () => void;
  testGroup?: TestGroupDto;
  trainingId?: string;
  lectureId?: string;
  files?: LectureAttachmentWithId[];
}
