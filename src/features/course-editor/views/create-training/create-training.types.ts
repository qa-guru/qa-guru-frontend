import {
  InputMaybe,
  Scalars,
  TechStack,
  UpdateTrainingMutationFn,
} from "api/graphql/generated/graphql";
import { FieldValues } from "react-hook-form";

export interface ICreateTraining {
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
