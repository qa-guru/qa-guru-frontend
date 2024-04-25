import {
  TrainingLecturesQuery,
  TrainingQuery,
} from "api/graphql/generated/graphql";

export interface IStepper {
  dataTrainingLectures: TrainingLecturesQuery;
  dataTraining: TrainingQuery;
  trainingId: string;
}
