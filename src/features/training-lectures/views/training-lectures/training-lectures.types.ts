import {
  TrainingLecturesQuery,
  TrainingQuery,
} from "api/graphql/generated/graphql";

export interface ITrainingLectures {
  dataTrainingLectures: TrainingLecturesQuery;
  dataTraining: TrainingQuery;
  trainingId: string;
}
