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

export interface IInputSelectTrainingsPurchases {
  dataTrainings?: TrainingsQuery;
  dataTrainingPurchasesByUserId?: TrainingPurchasesByUserIdQuery;
  loadingTrainings: boolean;
  loadingUpdateTrainingPurchase: boolean;
  updateTrainingPurchase: UpdateTrainingPurchaseMutationFn;
  user: Maybe<UserDto>;
}
