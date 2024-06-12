import {
  LectureContentHomeWorkDto,
  Maybe,
} from "api/graphql/generated/graphql";

export interface IHomeworkSection {
  lectureHomeWork: Maybe<LectureContentHomeWorkDto>[];
  view: string;
  onKanbanView: () => void;
  onListView: () => void;
}
