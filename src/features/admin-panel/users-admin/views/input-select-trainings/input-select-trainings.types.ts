import {
  Maybe,
  TechStack,
  TrainingPurchasesByUserIdQuery,
  TrainingsQuery,
  UpdateTrainingPurchaseMutationFn,
  UserDto,
} from "api/graphql/generated/graphql";

export interface ITrainingOption {
  id: string;
  name: string;
  code?: Maybe<string>;
  techStack?: TechStack;
}

export interface IInputSelectTrainings {
  data?: TrainingsQuery;
  loading: boolean;
  updateTrainingPurchase: UpdateTrainingPurchaseMutationFn;
  trainingPurchases?: TrainingPurchasesByUserIdQuery;
  user: Maybe<UserDto>;
}
