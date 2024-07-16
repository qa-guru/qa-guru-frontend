import {
  LectureHomeWorkQuery,
  LectureQuery,
  Maybe,
  TrainingLecturesQuery,
  TrainingQuery,
} from "api/graphql/generated/graphql";

export interface ILectureDetail {
  dataLecture: LectureQuery;
  dataLectureHomework?: Maybe<LectureHomeWorkQuery>;
  dataTrainingLectures: TrainingLecturesQuery;
  dataTraining?: TrainingQuery;
  tariffHomework: boolean;
  trainingId?: string;
}
