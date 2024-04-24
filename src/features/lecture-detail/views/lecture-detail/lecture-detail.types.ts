import {
  LectureHomeWorkQuery,
  LectureQuery,
  Maybe,
  TrainingLecturesQuery,
} from "api/graphql/generated/graphql";

export interface ILectureDetail {
  dataLecture: LectureQuery;
  dataLectureHomework?: Maybe<LectureHomeWorkQuery>;
  dataTrainingLectures: TrainingLecturesQuery;
  tariffHomework: boolean;
  trainingId?: string;
}
