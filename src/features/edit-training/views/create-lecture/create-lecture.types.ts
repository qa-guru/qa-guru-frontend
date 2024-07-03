import {
  UpdateLectureMutationFn,
  UpdateTrainingLectureMutationFn,
} from "api/graphql/generated/graphql";

export interface ICreateLecture {
  updateLecture: UpdateLectureMutationFn;
  lectureIds?: string[];
  updateTrainingLecture: UpdateTrainingLectureMutationFn;
  loadingUpdateTrainingLecture: boolean;
}
