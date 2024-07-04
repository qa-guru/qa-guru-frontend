import {
  Maybe,
  UpdateTrainingLectureMutationFn,
} from "api/graphql/generated/graphql";

export interface IAddLecture {
  selectedLectureId?: Maybe<string>;
  lectureIds?: string[];
  updateTrainingLecture: UpdateTrainingLectureMutationFn;
  loadingUpdateTrainingLecture: boolean;
  trainingId?: string;
}
