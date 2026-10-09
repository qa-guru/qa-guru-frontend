import type { FieldValues } from "react-hook-form";

import {
  InputMaybe,
  Scalars,
  TechStack,
  TrainingQuery,
  UpdateTrainingMutationFn,
} from "api/graphql/generated/graphql";

export interface IEditTraining {
  updateTraining: UpdateTrainingMutationFn;
  data: TrainingQuery;
}

export type TrainingInput = {
  content?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  mentors?: InputMaybe<Array<InputMaybe<FieldValues>>>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  techStack: TechStack;
};
