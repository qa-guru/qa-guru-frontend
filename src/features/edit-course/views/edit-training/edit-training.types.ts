import {
  InputMaybe,
  Scalars,
  TechStack,
  TrainingQuery,
  UpdateTrainingMutationFn,
} from "api/graphql/generated/graphql";
import { FieldValues } from "react-hook-form";

export interface IEditTraining {
  data: TrainingQuery;
  updateTraining: UpdateTrainingMutationFn;
}

export type TrainingInput = {
  content?: InputMaybe<Scalars["String"]>;
  description?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["ID"]>;
  mentors?: InputMaybe<Array<InputMaybe<FieldValues>>>;
  name?: InputMaybe<Scalars["String"]>;
  techStack: TechStack;
};
