import { TestGroupDto } from "api/graphql/generated/graphql";

export interface IHomeworkSection {
  lectureHomeWork: string;
  view: string;
  onKanbanView: () => void;
  onListView: () => void;
  testGroup?: TestGroupDto;
  trainingId?: string;
  lectureId?: string;
}
