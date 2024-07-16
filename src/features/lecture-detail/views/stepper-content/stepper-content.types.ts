import { Maybe, TrainingLectureDto } from "api/graphql/generated/graphql";

export interface IStepperContent {
  lectures?: Maybe<TrainingLectureDto>[];
  activeStep: number;
  changeStep: (direction: number) => void;
}
