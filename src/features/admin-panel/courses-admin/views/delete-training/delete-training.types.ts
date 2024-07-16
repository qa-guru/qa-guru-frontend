import { DeleteTrainingMutationFn, Maybe } from "api/graphql/generated/graphql";

export interface IDeleteTraining {
  deleteTraining: DeleteTrainingMutationFn;
  trainingId: Maybe<string>;
  loadingDeleteTraining: boolean;
}
