import { Maybe, TrainingLecturesQuery } from "api/graphql/generated/graphql";

export interface IStepperButtons {
  dataTrainingLectures: TrainingLecturesQuery;
  trainingId?: Maybe<string>;
}
