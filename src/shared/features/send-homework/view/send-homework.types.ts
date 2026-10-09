import {
  CreateHomeWorkToCheckMutationFn,
  Maybe,
  SendHomeWorkToCheckMutationFn,
  UpdateHomeworkMutationFn,
  TestGroupDto,
} from "api/graphql/generated/graphql";

export interface ISendHomeWork {
  createHomeWorkToCheck: CreateHomeWorkToCheckMutationFn;
  updateHomework: UpdateHomeworkMutationFn;
  sendHomeWorkToCheck: SendHomeWorkToCheckMutationFn;
  loadingCreateHomeWorkToCheck: boolean;
  loadingUpdateHomework: boolean;
  loadingSendHomeWorkToCheck: boolean;
  homeWorkId?: Maybe<string>;
  testGroup?: TestGroupDto;
  trainingId?: string;
  lectureId?: string;
}
