import {
  Maybe,
  TechStack,
  TrainingPurchasesByUserIdQuery,
  TrainingsQuery,
  UpdateUserTrainingPurchaseMutationFn,
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
  loadingUpdateUserTrainingPurchase: boolean;
  updateUserTrainingPurchase: UpdateUserTrainingPurchaseMutationFn;
  user: Maybe<UserDto>;
}
