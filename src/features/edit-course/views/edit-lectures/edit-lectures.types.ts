import {
  TrainingLecturesQuery,
  UpdateLectureMutationFn,
  UpdateTrainingLectureMutationFn,
} from "api/graphql/generated/graphql";

export interface IEditLectures {
  data: TrainingLecturesQuery;
  updateTrainingLecture: UpdateTrainingLectureMutationFn;
  updatLecture: UpdateLectureMutationFn;
}
