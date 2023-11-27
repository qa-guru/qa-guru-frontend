import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
import * as React from "react";
import * as ApolloReactComponents from "@apollo/client/react/components";

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInteger: any;
  Date: any;
  DateTime: any;
  LocalDateTime: any;
  LocalTime: any;
  Long: any;
  Time: any;
  Timestamp: any;
  Url: any;
  Void: any;
};

export type CommentHomeWorkDto = {
  __typename?: "CommentHomeWorkDto";
  children?: Maybe<Array<Maybe<CommentHomeWorkDto>>>;
  content?: Maybe<Scalars["String"]>;
  creationDate?: Maybe<Scalars["LocalDateTime"]>;
  creator?: Maybe<UserDto>;
  homeWork?: Maybe<StudentHomeWorkDto>;
  id?: Maybe<Scalars["ID"]>;
};

export type CommentHomeWorkSort = {
  field?: InputMaybe<CommentHomeWorkSortField>;
  order?: InputMaybe<Order>;
};

export enum CommentHomeWorkSortField {
  CreationDate = "CREATION_DATE",
  Creator = "CREATOR",
}

export type CommentHomeWorksDto = {
  __typename?: "CommentHomeWorksDto";
  items?: Maybe<Array<Maybe<CommentHomeWorkDto>>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  totalElements?: Maybe<Scalars["Long"]>;
};

export type ContentFileDto = {
  __typename?: "ContentFileDto";
  fileLocation?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  size?: Maybe<Scalars["Long"]>;
  type?: Maybe<Scalars["String"]>;
};

export type HomeWorksStatisticDto = {
  __typename?: "HomeWorksStatisticDto";
  count?: Maybe<Scalars["Long"]>;
  status?: Maybe<StudentHomeWorkStatus>;
};

export type LectureContentDto = {
  __typename?: "LectureContentDto";
  type?: Maybe<Scalars["String"]>;
  url?: Maybe<Scalars["String"]>;
  value?: Maybe<Scalars["String"]>;
};

export type LectureContentHomeWorkDto = {
  __typename?: "LectureContentHomeWorkDto";
  type?: Maybe<Scalars["String"]>;
  url?: Maybe<Scalars["String"]>;
  value?: Maybe<Scalars["String"]>;
};

export type LectureContentHomeWorkInput = {
  type?: InputMaybe<Scalars["String"]>;
  url?: InputMaybe<Scalars["String"]>;
  value?: InputMaybe<Scalars["String"]>;
};

export type LectureContentInput = {
  type?: InputMaybe<Scalars["String"]>;
  url?: InputMaybe<Scalars["String"]>;
  value?: InputMaybe<Scalars["String"]>;
};

export type LectureDto = {
  __typename?: "LectureDto";
  creationDate?: Maybe<Scalars["LocalDateTime"]>;
  description?: Maybe<Array<Maybe<Scalars["String"]>>>;
  homeWorkLevel?: Maybe<LectureHomeWorkLevelDto>;
  id?: Maybe<Scalars["ID"]>;
  modificationDate?: Maybe<Scalars["LocalDateTime"]>;
  speakers?: Maybe<Array<Maybe<UserDto>>>;
  subject?: Maybe<Scalars["String"]>;
};

export type LectureHomeWorkLevelDto = {
  __typename?: "LectureHomeWorkLevelDto";
  code?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  estimate?: Maybe<Scalars["Int"]>;
  id?: Maybe<Scalars["ID"]>;
};

export type LectureHomeWorkLevelInput = {
  code?: InputMaybe<Scalars["String"]>;
  description?: InputMaybe<Scalars["String"]>;
  estimate?: InputMaybe<Scalars["Int"]>;
  id?: InputMaybe<Scalars["ID"]>;
};

export type LectureInfoDto = {
  __typename?: "LectureInfoDto";
  content?: Maybe<Array<Maybe<LectureContentDto>>>;
  contentHomeWork?: Maybe<Array<Maybe<LectureContentHomeWorkDto>>>;
  creationDate?: Maybe<Scalars["LocalDateTime"]>;
  description?: Maybe<Array<Maybe<Scalars["String"]>>>;
  homeWorkLevel?: Maybe<LectureHomeWorkLevelDto>;
  id?: Maybe<Scalars["ID"]>;
  modificationDate?: Maybe<Scalars["LocalDateTime"]>;
  speakers?: Maybe<Array<Maybe<UserDto>>>;
  subject?: Maybe<Scalars["String"]>;
};

export type LectureInfoShortDto = {
  __typename?: "LectureInfoShortDto";
  content?: Maybe<Array<Maybe<LectureContentDto>>>;
  creationDate?: Maybe<Scalars["LocalDateTime"]>;
  description?: Maybe<Array<Maybe<Scalars["String"]>>>;
  homeWorkLevel?: Maybe<LectureHomeWorkLevelDto>;
  id?: Maybe<Scalars["ID"]>;
  modificationDate?: Maybe<Scalars["LocalDateTime"]>;
  speakers?: Maybe<Array<Maybe<UserDto>>>;
  subject?: Maybe<Scalars["String"]>;
};

export type LectureInput = {
  content?: InputMaybe<Array<InputMaybe<LectureContentInput>>>;
  contentHomeWork?: InputMaybe<Array<InputMaybe<LectureContentHomeWorkInput>>>;
  description?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  homeWorkLevelCode?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["ID"]>;
  speakers?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  subject?: InputMaybe<Scalars["String"]>;
};

export type LectureSort = {
  field?: InputMaybe<LectureSortField>;
  order?: InputMaybe<Order>;
};

export enum LectureSortField {
  CreationDate = "CREATION_DATE",
  Subject = "SUBJECT",
}

export type LecturesDto = {
  __typename?: "LecturesDto";
  items?: Maybe<Array<Maybe<LectureDto>>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  totalElements?: Maybe<Scalars["Long"]>;
};

/** Mutation root */
export type Mutation = {
  __typename?: "Mutation";
  answerComment?: Maybe<CommentHomeWorkDto>;
  approved?: Maybe<StudentHomeWorkDto>;
  changePassword?: Maybe<Scalars["Void"]>;
  changePasswordByUserId?: Maybe<Scalars["Void"]>;
  /** user section */
  createUser?: Maybe<UserDto>;
  deleteComment?: Maybe<Scalars["Void"]>;
  deleteHomeWork?: Maybe<Scalars["Void"]>;
  deleteLecture?: Maybe<Scalars["Void"]>;
  deleteLectureHomeWorkLevel?: Maybe<Scalars["Void"]>;
  deleteTraining?: Maybe<Scalars["Void"]>;
  deleteTrainingTariff?: Maybe<Scalars["Void"]>;
  lockUser?: Maybe<Scalars["Void"]>;
  notApproved?: Maybe<StudentHomeWorkDto>;
  resetPassword?: Maybe<Scalars["Void"]>;
  resetState?: Maybe<StudentHomeWorkDto>;
  /** commentHomeWork section */
  sendComment?: Maybe<CommentHomeWorkDto>;
  /** studentHomeWork section */
  sendHomeWorkToCheck?: Maybe<StudentHomeWorkDto>;
  setPassword?: Maybe<Scalars["Void"]>;
  takeForReview?: Maybe<StudentHomeWorkDto>;
  unlockUser?: Maybe<Scalars["Void"]>;
  updateComment?: Maybe<CommentHomeWorkDto>;
  updateHomeWork?: Maybe<StudentHomeWorkDto>;
  /** lecture section */
  updateLecture?: Maybe<LectureInfoDto>;
  /** lecture home work level section */
  updateLectureHomeWorkLevel?: Maybe<LectureHomeWorkLevelDto>;
  updateRole?: Maybe<UserDto>;
  /** training section */
  updateTraining?: Maybe<TrainingDto>;
  /** training lecture */
  updateTrainingLecture?: Maybe<Array<Maybe<TrainingLectureDto>>>;
  /** training purchase section */
  updateTrainingPurchase?: Maybe<TrainingPurchaseDto>;
  /** training tariff */
  updateTrainingTariff?: Maybe<TrainingTariffDto>;
  updateUser?: Maybe<UserDto>;
};

/** Mutation root */
export type MutationAnswerCommentArgs = {
  content: Scalars["String"];
  parentID: Scalars["ID"];
};

/** Mutation root */
export type MutationApprovedArgs = {
  homeWorkId: Scalars["ID"];
};

/** Mutation root */
export type MutationChangePasswordArgs = {
  newPassword: Scalars["String"];
  oldPassword: Scalars["String"];
};

/** Mutation root */
export type MutationChangePasswordByUserIdArgs = {
  password: Scalars["String"];
  userId: Scalars["ID"];
};

/** Mutation root */
export type MutationCreateUserArgs = {
  input: UserCreateInput;
};

/** Mutation root */
export type MutationDeleteCommentArgs = {
  id: Scalars["ID"];
};

/** Mutation root */
export type MutationDeleteHomeWorkArgs = {
  id: Scalars["ID"];
};

/** Mutation root */
export type MutationDeleteLectureArgs = {
  id: Scalars["ID"];
};

/** Mutation root */
export type MutationDeleteLectureHomeWorkLevelArgs = {
  id: Scalars["ID"];
};

/** Mutation root */
export type MutationDeleteTrainingArgs = {
  id: Scalars["ID"];
};

/** Mutation root */
export type MutationDeleteTrainingTariffArgs = {
  id: Scalars["ID"];
};

/** Mutation root */
export type MutationLockUserArgs = {
  id: Scalars["ID"];
};

/** Mutation root */
export type MutationNotApprovedArgs = {
  homeWorkId: Scalars["ID"];
};

/** Mutation root */
export type MutationResetPasswordArgs = {
  email: Scalars["String"];
};

/** Mutation root */
export type MutationResetStateArgs = {
  homeWorkId: Scalars["ID"];
};

/** Mutation root */
export type MutationSendCommentArgs = {
  content: Scalars["String"];
  homeWorkId: Scalars["ID"];
};

/** Mutation root */
export type MutationSendHomeWorkToCheckArgs = {
  content: Scalars["String"];
  lectureId: Scalars["ID"];
};

/** Mutation root */
export type MutationSetPasswordArgs = {
  newPassword: Scalars["String"];
  token: Scalars["String"];
};

/** Mutation root */
export type MutationTakeForReviewArgs = {
  homeWorkId: Scalars["ID"];
};

/** Mutation root */
export type MutationUnlockUserArgs = {
  id: Scalars["ID"];
};

/** Mutation root */
export type MutationUpdateCommentArgs = {
  content: Scalars["String"];
  id: Scalars["ID"];
};

/** Mutation root */
export type MutationUpdateHomeWorkArgs = {
  content: Scalars["String"];
  id: Scalars["ID"];
};

/** Mutation root */
export type MutationUpdateLectureArgs = {
  input: LectureInput;
};

/** Mutation root */
export type MutationUpdateLectureHomeWorkLevelArgs = {
  input: LectureHomeWorkLevelInput;
};

/** Mutation root */
export type MutationUpdateRoleArgs = {
  id: Scalars["ID"];
  roles?: InputMaybe<Array<InputMaybe<UserRole>>>;
};

/** Mutation root */
export type MutationUpdateTrainingArgs = {
  input: TrainingInput;
};

/** Mutation root */
export type MutationUpdateTrainingLectureArgs = {
  id: Scalars["ID"];
  lectureIds?: InputMaybe<Array<Scalars["ID"]>>;
};

/** Mutation root */
export type MutationUpdateTrainingPurchaseArgs = {
  input: TrainingPurchaseInput;
};

/** Mutation root */
export type MutationUpdateTrainingTariffArgs = {
  input: TrainingTariffInput;
};

/** Mutation root */
export type MutationUpdateUserArgs = {
  input: UserUpdateInput;
};

export enum Order {
  Asc = "ASC",
  Desc = "DESC",
}

/** Query root */
export type Query = {
  __typename?: "Query";
  checkResetPasswordToken?: Maybe<Scalars["Void"]>;
  /** commentHomeWork section */
  commentHomeWorkById?: Maybe<CommentHomeWorksDto>;
  commentsHomeWorkByHomeWork?: Maybe<CommentHomeWorksDto>;
  /** studentHomeWork section */
  homeWork?: Maybe<StudentHomeWorkDto>;
  homeWorkByLecture?: Maybe<StudentHomeWorkDto>;
  homeWorkByStudentAndLecture?: Maybe<StudentHomeWorkDto>;
  homeWorks?: Maybe<StudentHomeWorksDto>;
  homeWorksByLectureId?: Maybe<StudentHomeWorksDto>;
  homeWorksByStatus?: Maybe<StudentHomeWorksDto>;
  homeWorksStatistic?: Maybe<Array<Maybe<HomeWorksStatisticDto>>>;
  /** lecture section */
  lecture?: Maybe<LectureInfoShortDto>;
  lectureHomeWork?: Maybe<Array<Maybe<LectureContentHomeWorkDto>>>;
  /** lecture home work level section */
  lectureHomeWorkLevel?: Maybe<LectureHomeWorkLevelDto>;
  lectureHomeWorkLevels?: Maybe<Array<Maybe<LectureHomeWorkLevelDto>>>;
  lectures?: Maybe<LecturesDto>;
  mentors?: Maybe<UsersDto>;
  /** training section */
  training?: Maybe<TrainingDto>;
  /** training lecture */
  trainingLectures?: Maybe<Array<Maybe<TrainingLectureDto>>>;
  /** purchase section */
  trainingPurchases?: Maybe<Array<Maybe<TrainingPurchaseDto>>>;
  trainingPurchasesByUserId?: Maybe<Array<Maybe<TrainingPurchaseDto>>>;
  /** training tariff */
  trainingTariffs?: Maybe<TrainingTariffsDto>;
  trainings?: Maybe<TrainingsDto>;
  trainingsByMentor?: Maybe<TrainingsDto>;
  /** statistics section */
  trainingsHomeWorksStatistic?: Maybe<
    Array<Maybe<TrainingHomeWorksStatisticDto>>
  >;
  /** user section */
  user?: Maybe<UserDto>;
  userRoles?: Maybe<Array<Maybe<UserRoleDto>>>;
  users?: Maybe<UsersDto>;
};

/** Query root */
export type QueryCheckResetPasswordTokenArgs = {
  token: Scalars["String"];
};

/** Query root */
export type QueryCommentHomeWorkByIdArgs = {
  id: Scalars["ID"];
};

/** Query root */
export type QueryCommentsHomeWorkByHomeWorkArgs = {
  homeWorkId: Scalars["ID"];
  limit: Scalars["Int"];
  offset: Scalars["Int"];
  sort?: InputMaybe<CommentHomeWorkSort>;
};

/** Query root */
export type QueryHomeWorkArgs = {
  id: Scalars["ID"];
};

/** Query root */
export type QueryHomeWorkByLectureArgs = {
  lectureId: Scalars["ID"];
};

/** Query root */
export type QueryHomeWorkByStudentAndLectureArgs = {
  lectureId: Scalars["ID"];
  studentId: Scalars["ID"];
};

/** Query root */
export type QueryHomeWorksArgs = {
  filter?: InputMaybe<StudentHomeWorkFilter>;
  limit: Scalars["Int"];
  offset: Scalars["Int"];
  sort?: InputMaybe<StudentHomeWorkSort>;
};

/** Query root */
export type QueryHomeWorksByLectureIdArgs = {
  lectureId: Scalars["ID"];
  limit: Scalars["Int"];
  offset: Scalars["Int"];
  sort?: InputMaybe<StudentHomeWorkSort>;
};

/** Query root */
export type QueryHomeWorksByStatusArgs = {
  limit: Scalars["Int"];
  offset: Scalars["Int"];
  sort?: InputMaybe<StudentHomeWorkSort>;
  status: StudentHomeWorkStatus;
};

/** Query root */
export type QueryHomeWorksStatisticArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

/** Query root */
export type QueryLectureArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

/** Query root */
export type QueryLectureHomeWorkArgs = {
  lectureId?: InputMaybe<Scalars["ID"]>;
};

/** Query root */
export type QueryLectureHomeWorkLevelArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

/** Query root */
export type QueryLecturesArgs = {
  limit: Scalars["Int"];
  offset: Scalars["Int"];
  sort?: InputMaybe<LectureSort>;
};

/** Query root */
export type QueryMentorsArgs = {
  limit: Scalars["Int"];
  offset: Scalars["Int"];
  sort?: InputMaybe<UserSort>;
};

/** Query root */
export type QueryTrainingArgs = {
  id: Scalars["ID"];
};

/** Query root */
export type QueryTrainingLecturesArgs = {
  id: Scalars["ID"];
};

/** Query root */
export type QueryTrainingPurchasesByUserIdArgs = {
  userId: Scalars["ID"];
};

/** Query root */
export type QueryTrainingTariffsArgs = {
  limit: Scalars["Int"];
  offset: Scalars["Int"];
  sort?: InputMaybe<TrainingTariffSort>;
};

/** Query root */
export type QueryTrainingsArgs = {
  limit: Scalars["Int"];
  offset: Scalars["Int"];
  sort?: InputMaybe<TrainingSort>;
};

/** Query root */
export type QueryTrainingsByMentorArgs = {
  limit: Scalars["Int"];
  offset: Scalars["Int"];
  sort?: InputMaybe<TrainingSort>;
};

/** Query root */
export type QueryTrainingsHomeWorksStatisticArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

/** Query root */
export type QueryUsersArgs = {
  limit: Scalars["Int"];
  offset: Scalars["Int"];
  sort?: InputMaybe<UserSort>;
};

export type StudentHomeWorkDto = {
  __typename?: "StudentHomeWorkDto";
  answer?: Maybe<Scalars["String"]>;
  creationDate?: Maybe<Scalars["LocalDateTime"]>;
  endCheckingDate?: Maybe<Scalars["LocalDateTime"]>;
  id?: Maybe<Scalars["ID"]>;
  lecture?: Maybe<LectureInfoDto>;
  mentor?: Maybe<UserDto>;
  startCheckingDate?: Maybe<Scalars["LocalDateTime"]>;
  status?: Maybe<StudentHomeWorkStatus>;
  student?: Maybe<UserDto>;
};

export type StudentHomeWorkFilter = {
  creationDateFrom?: InputMaybe<Scalars["LocalDateTime"]>;
  creationDateTo?: InputMaybe<Scalars["LocalDateTime"]>;
  lectureId?: InputMaybe<Scalars["ID"]>;
  mentorId?: InputMaybe<Scalars["ID"]>;
  status?: InputMaybe<StudentHomeWorkStatus>;
  trainingId?: InputMaybe<Scalars["ID"]>;
};

export type StudentHomeWorkSort = {
  field?: InputMaybe<StudentHomeWorkSortField>;
  order?: InputMaybe<Order>;
};

export enum StudentHomeWorkSortField {
  CreationDate = "CREATION_DATE",
  EndCheckingDate = "END_CHECKING_DATE",
  Mentor = "MENTOR",
  StartCheckingDate = "START_CHECKING_DATE",
  State = "STATE",
  Student = "STUDENT",
}

export enum StudentHomeWorkStatus {
  Approved = "APPROVED",
  InReview = "IN_REVIEW",
  New = "NEW",
  NotApproved = "NOT_APPROVED",
}

export type StudentHomeWorksDto = {
  __typename?: "StudentHomeWorksDto";
  items?: Maybe<Array<Maybe<StudentHomeWorkDto>>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  totalElements?: Maybe<Scalars["Long"]>;
};

export enum TechStack {
  Java = "JAVA",
  Python = "PYTHON",
}

export type TrainingDto = {
  __typename?: "TrainingDto";
  content?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  mentors?: Maybe<Array<Maybe<UserDto>>>;
  name: Scalars["String"];
  tariffs?: Maybe<Array<Maybe<TrainingTariffDto>>>;
  techStack: TechStack;
};

export type TrainingHomeWorksStatisticDto = {
  __typename?: "TrainingHomeWorksStatisticDto";
  homeworks?: Maybe<Array<Maybe<HomeWorksStatisticDto>>>;
  training?: Maybe<TrainingDto>;
};

export type TrainingInput = {
  content?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["ID"]>;
  mentors?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  name?: InputMaybe<Scalars["String"]>;
  techStack: TechStack;
};

export type TrainingLectureDto = {
  __typename?: "TrainingLectureDto";
  id?: Maybe<Scalars["ID"]>;
  lastLecture?: Maybe<LectureDto>;
  lecture?: Maybe<LectureDto>;
  locking?: Maybe<Scalars["Boolean"]>;
  number?: Maybe<Scalars["Int"]>;
};

export type TrainingLectureInput = {
  lastLecture?: InputMaybe<Scalars["ID"]>;
  lecture: Scalars["ID"];
  locking?: InputMaybe<Scalars["Boolean"]>;
};

export type TrainingPurchaseDto = {
  __typename?: "TrainingPurchaseDto";
  id?: Maybe<Scalars["ID"]>;
  trainingTariff: TrainingTariffDto;
  user: UserDto;
};

export type TrainingPurchaseInput = {
  id?: InputMaybe<Scalars["ID"]>;
  trainingTariffCode?: InputMaybe<Scalars["String"]>;
  userEmail?: InputMaybe<Scalars["String"]>;
};

export type TrainingSort = {
  field?: InputMaybe<TrainingSortField>;
  order?: InputMaybe<Order>;
};

export enum TrainingSortField {
  CreationDate = "CREATION_DATE",
  Name = "NAME",
}

export type TrainingTariffDto = {
  __typename?: "TrainingTariffDto";
  code?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  homeWork?: Maybe<Scalars["Boolean"]>;
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  price?: Maybe<Scalars["Float"]>;
  training?: Maybe<TrainingDto>;
};

export enum TrainingTariffField {
  Code = "CODE",
  CreationDate = "CREATION_DATE",
  Name = "NAME",
}

export type TrainingTariffInput = {
  code?: InputMaybe<Scalars["String"]>;
  description?: InputMaybe<Scalars["String"]>;
  homeWork?: InputMaybe<Scalars["Boolean"]>;
  id?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  price?: InputMaybe<Scalars["Float"]>;
  trainingName?: InputMaybe<Scalars["String"]>;
};

export type TrainingTariffSort = {
  field?: InputMaybe<TrainingTariffField>;
  order?: InputMaybe<Order>;
};

export type TrainingTariffsDto = {
  __typename?: "TrainingTariffsDto";
  items?: Maybe<Array<Maybe<TrainingTariffDto>>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  totalElements?: Maybe<Scalars["Long"]>;
};

export type TrainingsDto = {
  __typename?: "TrainingsDto";
  items?: Maybe<Array<Maybe<TrainingDto>>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  totalElements?: Maybe<Scalars["Long"]>;
};

export type UserCreateInput = {
  email: Scalars["String"];
  firstName: Scalars["String"];
  id?: InputMaybe<Scalars["ID"]>;
  lastName: Scalars["String"];
  middleName?: InputMaybe<Scalars["String"]>;
  password: Scalars["String"];
  phoneNumber?: InputMaybe<Scalars["String"]>;
};

export type UserDto = {
  __typename?: "UserDto";
  avatarLocation?: Maybe<Scalars["String"]>;
  confirmationDate?: Maybe<Scalars["LocalDateTime"]>;
  creationDate?: Maybe<Scalars["LocalDateTime"]>;
  email?: Maybe<Scalars["String"]>;
  firstName?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["ID"]>;
  lastName?: Maybe<Scalars["String"]>;
  locked?: Maybe<Scalars["Boolean"]>;
  middleName?: Maybe<Scalars["String"]>;
  phoneNumber?: Maybe<Scalars["String"]>;
  roles?: Maybe<Array<Maybe<UserRole>>>;
  updateDate?: Maybe<Scalars["LocalDateTime"]>;
};

export enum UserRole {
  Admin = "ADMIN",
  Lector = "LECTOR",
  Manager = "MANAGER",
  Master = "MASTER",
  Mentor = "MENTOR",
  Student = "STUDENT",
}

export type UserRoleDto = {
  __typename?: "UserRoleDto";
  description?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
};

export type UserSort = {
  field?: InputMaybe<UserSortField>;
  order?: InputMaybe<Order>;
};

export enum UserSortField {
  Email = "EMAIL",
  LastName = "LAST_NAME",
  Phone = "PHONE",
}

export type UserUpdateInput = {
  email: Scalars["String"];
  firstName: Scalars["String"];
  id?: InputMaybe<Scalars["ID"]>;
  lastName: Scalars["String"];
  middleName?: InputMaybe<Scalars["String"]>;
  phoneNumber?: InputMaybe<Scalars["String"]>;
};

export type UsersDto = {
  __typename?: "UsersDto";
  items?: Maybe<Array<Maybe<UserDto>>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  totalElements?: Maybe<Scalars["Long"]>;
};

export type AnswerCommentMutationVariables = Exact<{
  parentID: Scalars["ID"];
  content: Scalars["String"];
}>;

export type AnswerCommentMutation = {
  __typename?: "Mutation";
  answerComment?: {
    __typename?: "CommentHomeWorkDto";
    id?: string | null;
    creationDate?: any | null;
    content?: string | null;
    creator?: {
      __typename?: "UserDto";
      id?: string | null;
      email?: string | null;
      firstName?: string | null;
      middleName?: string | null;
      lastName?: string | null;
    } | null;
    homeWork?: {
      __typename?: "StudentHomeWorkDto";
      id?: string | null;
      answer?: string | null;
      status?: StudentHomeWorkStatus | null;
    } | null;
  } | null;
};

export type CommentsHomeWorkByHomeWorkQueryVariables = Exact<{
  offset: Scalars["Int"];
  limit: Scalars["Int"];
  sort: CommentHomeWorkSort;
  homeWorkId: Scalars["ID"];
}>;

export type CommentsHomeWorkByHomeWorkQuery = {
  __typename?: "Query";
  commentsHomeWorkByHomeWork?: {
    __typename?: "CommentHomeWorksDto";
    offset?: number | null;
    limit?: number | null;
    totalElements?: any | null;
    items?: Array<{
      __typename?: "CommentHomeWorkDto";
      id?: string | null;
      creationDate?: any | null;
      content?: string | null;
      creator?: {
        __typename?: "UserDto";
        id?: string | null;
        firstName?: string | null;
        middleName?: string | null;
        lastName?: string | null;
      } | null;
      homeWork?: {
        __typename?: "StudentHomeWorkDto";
        id?: string | null;
      } | null;
    } | null> | null;
  } | null;
};

export type SubCommentHomeWorkDtoRecursiveFragment = {
  __typename?: "CommentHomeWorkDto";
  children?: Array<{
    __typename?: "CommentHomeWorkDto";
    id?: string | null;
    content?: string | null;
    children?: Array<{
      __typename?: "CommentHomeWorkDto";
      id?: string | null;
      content?: string | null;
      children?: Array<{
        __typename?: "CommentHomeWorkDto";
        id?: string | null;
        content?: string | null;
        children?: Array<{
          __typename?: "CommentHomeWorkDto";
          id?: string | null;
          content?: string | null;
          children?: Array<{
            __typename?: "CommentHomeWorkDto";
            id?: string | null;
            content?: string | null;
            creator?: {
              __typename?: "UserDto";
              id?: string | null;
              email?: string | null;
              firstName?: string | null;
              lastName?: string | null;
              middleName?: string | null;
              avatarLocation?: string | null;
              locked?: boolean | null;
            } | null;
          } | null> | null;
          creator?: {
            __typename?: "UserDto";
            id?: string | null;
            email?: string | null;
            firstName?: string | null;
            lastName?: string | null;
            middleName?: string | null;
            avatarLocation?: string | null;
            locked?: boolean | null;
          } | null;
        } | null> | null;
        creator?: {
          __typename?: "UserDto";
          id?: string | null;
          email?: string | null;
          firstName?: string | null;
          lastName?: string | null;
          middleName?: string | null;
          avatarLocation?: string | null;
          locked?: boolean | null;
        } | null;
      } | null> | null;
      creator?: {
        __typename?: "UserDto";
        id?: string | null;
        email?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        middleName?: string | null;
        avatarLocation?: string | null;
        locked?: boolean | null;
      } | null;
    } | null> | null;
    creator?: {
      __typename?: "UserDto";
      id?: string | null;
      email?: string | null;
      firstName?: string | null;
      lastName?: string | null;
      middleName?: string | null;
      avatarLocation?: string | null;
      locked?: boolean | null;
    } | null;
  } | null> | null;
};

export type SubCommentHomeWorkDtoFragment = {
  __typename?: "CommentHomeWorkDto";
  id?: string | null;
  content?: string | null;
  creator?: {
    __typename?: "UserDto";
    id?: string | null;
    email?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    middleName?: string | null;
    avatarLocation?: string | null;
    locked?: boolean | null;
  } | null;
};

export type SendCommentMutationVariables = Exact<{
  homeWorkId: Scalars["ID"];
  content: Scalars["String"];
}>;

export type SendCommentMutation = {
  __typename?: "Mutation";
  sendComment?: {
    __typename?: "CommentHomeWorkDto";
    id?: string | null;
    creationDate?: any | null;
    content?: string | null;
    creator?: {
      __typename?: "UserDto";
      id?: string | null;
      email?: string | null;
      firstName?: string | null;
      middleName?: string | null;
      lastName?: string | null;
    } | null;
    homeWork?: {
      __typename?: "StudentHomeWorkDto";
      id?: string | null;
      answer?: string | null;
      status?: StudentHomeWorkStatus | null;
    } | null;
  } | null;
};

export type UpdateCommentMutationVariables = Exact<{
  id: Scalars["ID"];
  content: Scalars["String"];
}>;

export type UpdateCommentMutation = {
  __typename?: "Mutation";
  updateComment?: {
    __typename?: "CommentHomeWorkDto";
    id?: string | null;
    creationDate?: any | null;
    content?: string | null;
    creator?: {
      __typename?: "UserDto";
      id?: string | null;
      email?: string | null;
      firstName?: string | null;
      middleName?: string | null;
      lastName?: string | null;
    } | null;
    homeWork?: {
      __typename?: "StudentHomeWorkDto";
      id?: string | null;
      answer?: string | null;
      status?: StudentHomeWorkStatus | null;
    } | null;
  } | null;
};

export type ApprovedMutationVariables = Exact<{
  homeWorkId: Scalars["ID"];
}>;

export type ApprovedMutation = {
  __typename?: "Mutation";
  approved?: {
    __typename?: "StudentHomeWorkDto";
    id?: string | null;
    answer?: string | null;
    status?: StudentHomeWorkStatus | null;
    startCheckingDate?: any | null;
    endCheckingDate?: any | null;
    lecture?: {
      __typename?: "LectureInfoDto";
      id?: string | null;
      subject?: string | null;
      description?: Array<string | null> | null;
    } | null;
    student?: {
      __typename?: "UserDto";
      id?: string | null;
      email?: string | null;
      firstName?: string | null;
      middleName?: string | null;
      lastName?: string | null;
    } | null;
    mentor?: {
      __typename?: "UserDto";
      id?: string | null;
      email?: string | null;
      firstName?: string | null;
      middleName?: string | null;
      lastName?: string | null;
    } | null;
  } | null;
};

export type ApprovedHomeworkFragment = {
  __typename?: "StudentHomeWorkDto";
  id?: string | null;
  answer?: string | null;
  status?: StudentHomeWorkStatus | null;
  startCheckingDate?: any | null;
  endCheckingDate?: any | null;
  lecture?: {
    __typename?: "LectureInfoDto";
    id?: string | null;
    subject?: string | null;
    description?: Array<string | null> | null;
  } | null;
  student?: {
    __typename?: "UserDto";
    id?: string | null;
    email?: string | null;
    firstName?: string | null;
    middleName?: string | null;
    lastName?: string | null;
  } | null;
  mentor?: {
    __typename?: "UserDto";
    id?: string | null;
    email?: string | null;
    firstName?: string | null;
    middleName?: string | null;
    lastName?: string | null;
  } | null;
};

export type HomeWorkByLectureQueryVariables = Exact<{
  lectureId: Scalars["ID"];
}>;

export type HomeWorkByLectureQuery = {
  __typename?: "Query";
  homeWorkByLecture?: {
    __typename?: "StudentHomeWorkDto";
    id?: string | null;
    answer?: string | null;
    status?: StudentHomeWorkStatus | null;
    creationDate?: any | null;
    startCheckingDate?: any | null;
    endCheckingDate?: any | null;
    lecture?: {
      __typename?: "LectureInfoDto";
      id?: string | null;
      subject?: string | null;
    } | null;
    student?: {
      __typename?: "UserDto";
      id?: string | null;
      firstName?: string | null;
      middleName?: string | null;
      lastName?: string | null;
    } | null;
    mentor?: {
      __typename?: "UserDto";
      id?: string | null;
      firstName?: string | null;
      middleName?: string | null;
      lastName?: string | null;
    } | null;
  } | null;
};

export type HomeWorkQueryVariables = Exact<{
  homeWorkId: Scalars["ID"];
}>;

export type HomeWorkQuery = {
  __typename?: "Query";
  homeWork?: {
    __typename?: "StudentHomeWorkDto";
    id?: string | null;
    answer?: string | null;
    status?: StudentHomeWorkStatus | null;
    creationDate?: any | null;
    startCheckingDate?: any | null;
    endCheckingDate?: any | null;
    lecture?: {
      __typename?: "LectureInfoDto";
      id?: string | null;
      subject?: string | null;
      contentHomeWork?: Array<{
        __typename?: "LectureContentHomeWorkDto";
        url?: string | null;
        value?: string | null;
        type?: string | null;
      } | null> | null;
    } | null;
    student?: {
      __typename?: "UserDto";
      id?: string | null;
      firstName?: string | null;
      middleName?: string | null;
      lastName?: string | null;
    } | null;
    mentor?: {
      __typename?: "UserDto";
      id?: string | null;
      firstName?: string | null;
      middleName?: string | null;
      lastName?: string | null;
    } | null;
  } | null;
};

export type HomeWorksByLectureIdQueryVariables = Exact<{
  offset: Scalars["Int"];
  limit: Scalars["Int"];
  sort: StudentHomeWorkSort;
  lectureId: Scalars["ID"];
}>;

export type HomeWorksByLectureIdQuery = {
  __typename?: "Query";
  homeWorksByLectureId?: {
    __typename?: "StudentHomeWorksDto";
    offset?: number | null;
    limit?: number | null;
    totalElements?: any | null;
    items?: Array<{
      __typename?: "StudentHomeWorkDto";
      id?: string | null;
      answer?: string | null;
      status?: StudentHomeWorkStatus | null;
      creationDate?: any | null;
      startCheckingDate?: any | null;
      endCheckingDate?: any | null;
      student?: {
        __typename?: "UserDto";
        id?: string | null;
        firstName?: string | null;
        middleName?: string | null;
        lastName?: string | null;
      } | null;
      mentor?: {
        __typename?: "UserDto";
        id?: string | null;
        firstName?: string | null;
        middleName?: string | null;
        lastName?: string | null;
      } | null;
    } | null> | null;
  } | null;
};

export type HomeWorksQueryVariables = Exact<{
  offset: Scalars["Int"];
  limit: Scalars["Int"];
  sort?: InputMaybe<StudentHomeWorkSort>;
  filter?: InputMaybe<StudentHomeWorkFilter>;
}>;

export type HomeWorksQuery = {
  __typename?: "Query";
  homeWorks?: {
    __typename?: "StudentHomeWorksDto";
    offset?: number | null;
    limit?: number | null;
    totalElements?: any | null;
    items?: Array<{
      __typename?: "StudentHomeWorkDto";
      id?: string | null;
      answer?: string | null;
      status?: StudentHomeWorkStatus | null;
      creationDate?: any | null;
      startCheckingDate?: any | null;
      endCheckingDate?: any | null;
      lecture?: {
        __typename?: "LectureInfoDto";
        id?: string | null;
        subject?: string | null;
        description?: Array<string | null> | null;
        contentHomeWork?: Array<{
          __typename?: "LectureContentHomeWorkDto";
          url?: string | null;
          value?: string | null;
          type?: string | null;
        } | null> | null;
      } | null;
      student?: {
        __typename?: "UserDto";
        id?: string | null;
        firstName?: string | null;
        middleName?: string | null;
        lastName?: string | null;
      } | null;
      mentor?: {
        __typename?: "UserDto";
        id?: string | null;
        firstName?: string | null;
        middleName?: string | null;
        lastName?: string | null;
      } | null;
    } | null> | null;
  } | null;
};

export type NotApprovedMutationVariables = Exact<{
  homeWorkId: Scalars["ID"];
}>;

export type NotApprovedMutation = {
  __typename?: "Mutation";
  notApproved?: {
    __typename?: "StudentHomeWorkDto";
    id?: string | null;
    answer?: string | null;
    status?: StudentHomeWorkStatus | null;
    startCheckingDate?: any | null;
    endCheckingDate?: any | null;
    lecture?: {
      __typename?: "LectureInfoDto";
      id?: string | null;
      subject?: string | null;
      description?: Array<string | null> | null;
    } | null;
    student?: {
      __typename?: "UserDto";
      id?: string | null;
      email?: string | null;
      firstName?: string | null;
      middleName?: string | null;
      lastName?: string | null;
    } | null;
    mentor?: {
      __typename?: "UserDto";
      id?: string | null;
      email?: string | null;
      firstName?: string | null;
      middleName?: string | null;
      lastName?: string | null;
    } | null;
  } | null;
};

export type NotApprovedHomeworkFragment = {
  __typename?: "StudentHomeWorkDto";
  id?: string | null;
  answer?: string | null;
  status?: StudentHomeWorkStatus | null;
  startCheckingDate?: any | null;
  endCheckingDate?: any | null;
  lecture?: {
    __typename?: "LectureInfoDto";
    id?: string | null;
    subject?: string | null;
    description?: Array<string | null> | null;
  } | null;
  student?: {
    __typename?: "UserDto";
    id?: string | null;
    email?: string | null;
    firstName?: string | null;
    middleName?: string | null;
    lastName?: string | null;
  } | null;
  mentor?: {
    __typename?: "UserDto";
    id?: string | null;
    email?: string | null;
    firstName?: string | null;
    middleName?: string | null;
    lastName?: string | null;
  } | null;
};

export type SendHomeWorkToCheckMutationVariables = Exact<{
  lectureId: Scalars["ID"];
  content: Scalars["String"];
}>;

export type SendHomeWorkToCheckMutation = {
  __typename?: "Mutation";
  sendHomeWorkToCheck?: {
    __typename?: "StudentHomeWorkDto";
    id?: string | null;
    answer?: string | null;
    status?: StudentHomeWorkStatus | null;
    startCheckingDate?: any | null;
    endCheckingDate?: any | null;
    lecture?: {
      __typename?: "LectureInfoDto";
      id?: string | null;
      subject?: string | null;
      description?: Array<string | null> | null;
    } | null;
    student?: {
      __typename?: "UserDto";
      id?: string | null;
      firstName?: string | null;
      middleName?: string | null;
      lastName?: string | null;
    } | null;
    mentor?: {
      __typename?: "UserDto";
      id?: string | null;
      firstName?: string | null;
      middleName?: string | null;
      lastName?: string | null;
    } | null;
  } | null;
};

export type TakeForReviewMutationVariables = Exact<{
  homeworkId: Scalars["ID"];
}>;

export type TakeForReviewMutation = {
  __typename?: "Mutation";
  takeForReview?: {
    __typename?: "StudentHomeWorkDto";
    id?: string | null;
    answer?: string | null;
    status?: StudentHomeWorkStatus | null;
    startCheckingDate?: any | null;
    endCheckingDate?: any | null;
    lecture?: {
      __typename?: "LectureInfoDto";
      id?: string | null;
      subject?: string | null;
      description?: Array<string | null> | null;
    } | null;
    student?: {
      __typename?: "UserDto";
      id?: string | null;
      email?: string | null;
      firstName?: string | null;
      middleName?: string | null;
      lastName?: string | null;
    } | null;
    mentor?: {
      __typename?: "UserDto";
      id?: string | null;
      email?: string | null;
      firstName?: string | null;
      middleName?: string | null;
      lastName?: string | null;
    } | null;
  } | null;
};

export type NewTakeForReviewHomeWorkFragment = {
  __typename?: "StudentHomeWorkDto";
  id?: string | null;
  answer?: string | null;
  status?: StudentHomeWorkStatus | null;
  startCheckingDate?: any | null;
  endCheckingDate?: any | null;
  lecture?: {
    __typename?: "LectureInfoDto";
    id?: string | null;
    subject?: string | null;
    description?: Array<string | null> | null;
  } | null;
  student?: {
    __typename?: "UserDto";
    id?: string | null;
    email?: string | null;
    firstName?: string | null;
    middleName?: string | null;
    lastName?: string | null;
  } | null;
  mentor?: {
    __typename?: "UserDto";
    id?: string | null;
    email?: string | null;
    firstName?: string | null;
    middleName?: string | null;
    lastName?: string | null;
  } | null;
};

export type UpdateHomeworkMutationVariables = Exact<{
  id: Scalars["ID"];
  content: Scalars["String"];
}>;

export type UpdateHomeworkMutation = {
  __typename?: "Mutation";
  updateHomeWork?: {
    __typename?: "StudentHomeWorkDto";
    id?: string | null;
    answer?: string | null;
    status?: StudentHomeWorkStatus | null;
    startCheckingDate?: any | null;
    endCheckingDate?: any | null;
    lecture?: {
      __typename?: "LectureInfoDto";
      id?: string | null;
      subject?: string | null;
      description?: Array<string | null> | null;
    } | null;
    student?: {
      __typename?: "UserDto";
      id?: string | null;
      firstName?: string | null;
      middleName?: string | null;
      lastName?: string | null;
    } | null;
    mentor?: {
      __typename?: "UserDto";
      id?: string | null;
      firstName?: string | null;
      middleName?: string | null;
      lastName?: string | null;
    } | null;
  } | null;
};

export type LectureHomeWorkQueryVariables = Exact<{
  lectureId: Scalars["ID"];
}>;

export type LectureHomeWorkQuery = {
  __typename?: "Query";
  lectureHomeWork?: Array<{
    __typename?: "LectureContentHomeWorkDto";
    type?: string | null;
    value?: string | null;
    url?: string | null;
  } | null> | null;
};

export type LectureQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type LectureQuery = {
  __typename?: "Query";
  lecture?: {
    __typename?: "LectureInfoShortDto";
    id?: string | null;
    subject?: string | null;
    description?: Array<string | null> | null;
    speakers?: Array<{
      __typename?: "UserDto";
      id?: string | null;
      firstName?: string | null;
      lastName?: string | null;
      middleName?: string | null;
    } | null> | null;
    homeWorkLevel?: {
      __typename?: "LectureHomeWorkLevelDto";
      id?: string | null;
      code?: string | null;
      description?: string | null;
      estimate?: number | null;
    } | null;
    content?: Array<{
      __typename?: "LectureContentDto";
      type?: string | null;
      value?: string | null;
      url?: string | null;
    } | null> | null;
  } | null;
};

export type UpdateLectureMutationVariables = Exact<{
  input: LectureInput;
}>;

export type UpdateLectureMutation = {
  __typename?: "Mutation";
  updateLecture?: {
    __typename?: "LectureInfoDto";
    id?: string | null;
    subject?: string | null;
    description?: Array<string | null> | null;
    speakers?: Array<{
      __typename?: "UserDto";
      id?: string | null;
      firstName?: string | null;
      lastName?: string | null;
      middleName?: string | null;
    } | null> | null;
    homeWorkLevel?: {
      __typename?: "LectureHomeWorkLevelDto";
      id?: string | null;
      code?: string | null;
      description?: string | null;
      estimate?: number | null;
    } | null;
    content?: Array<{
      __typename?: "LectureContentDto";
      type?: string | null;
      value?: string | null;
      url?: string | null;
    } | null> | null;
    contentHomeWork?: Array<{
      __typename?: "LectureContentHomeWorkDto";
      type?: string | null;
      value?: string | null;
      url?: string | null;
    } | null> | null;
  } | null;
};

export type TrainingLecturesQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type TrainingLecturesQuery = {
  __typename?: "Query";
  trainingLectures?: Array<{
    __typename?: "TrainingLectureDto";
    id?: string | null;
    number?: number | null;
    locking?: boolean | null;
    lecture?: {
      __typename?: "LectureDto";
      id?: string | null;
      subject?: string | null;
      description?: Array<string | null> | null;
    } | null;
    lastLecture?: {
      __typename?: "LectureDto";
      id?: string | null;
      subject?: string | null;
      description?: Array<string | null> | null;
    } | null;
  } | null> | null;
};

export type TrainingPurchasesQueryVariables = Exact<{ [key: string]: never }>;

export type TrainingPurchasesQuery = {
  __typename?: "Query";
  trainingPurchases?: Array<{
    __typename?: "TrainingPurchaseDto";
    id?: string | null;
    user: {
      __typename?: "UserDto";
      id?: string | null;
      email?: string | null;
      firstName?: string | null;
      lastName?: string | null;
      middleName?: string | null;
    };
    trainingTariff: {
      __typename?: "TrainingTariffDto";
      id?: string | null;
      name?: string | null;
      code?: string | null;
      price?: number | null;
      homeWork?: boolean | null;
      description?: string | null;
      training?: {
        __typename?: "TrainingDto";
        id: string;
        name: string;
      } | null;
    };
  } | null> | null;
};

export type TrainingQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type TrainingQuery = {
  __typename?: "Query";
  training?: {
    __typename?: "TrainingDto";
    id: string;
    name: string;
    content?: string | null;
    techStack: TechStack;
    tariffs?: Array<{
      __typename?: "TrainingTariffDto";
      id?: string | null;
      name?: string | null;
      code?: string | null;
      price?: number | null;
      homeWork?: boolean | null;
      description?: string | null;
    } | null> | null;
    mentors?: Array<{
      __typename?: "UserDto";
      id?: string | null;
      firstName?: string | null;
      lastName?: string | null;
      middleName?: string | null;
    } | null> | null;
  } | null;
};

export type TrainingsByMentorQueryVariables = Exact<{
  offset: Scalars["Int"];
  limit: Scalars["Int"];
  sort?: InputMaybe<TrainingSort>;
}>;

export type TrainingsByMentorQuery = {
  __typename?: "Query";
  trainingsByMentor?: {
    __typename?: "TrainingsDto";
    offset?: number | null;
    limit?: number | null;
    totalElements?: any | null;
    items?: Array<{
      __typename?: "TrainingDto";
      id: string;
      name: string;
      content?: string | null;
      techStack: TechStack;
      mentors?: Array<{
        __typename?: "UserDto";
        id?: string | null;
        firstName?: string | null;
        middleName?: string | null;
        lastName?: string | null;
      } | null> | null;
    } | null> | null;
  } | null;
};

export type TrainingsQueryVariables = Exact<{
  offset: Scalars["Int"];
  limit: Scalars["Int"];
  sort?: InputMaybe<TrainingSort>;
}>;

export type TrainingsQuery = {
  __typename?: "Query";
  trainings?: {
    __typename?: "TrainingsDto";
    totalElements?: any | null;
    items?: Array<{
      __typename?: "TrainingDto";
      id: string;
      name: string;
      techStack: TechStack;
    } | null> | null;
  } | null;
};

export type UpdateTrainingMutationVariables = Exact<{
  input: TrainingInput;
}>;

export type UpdateTrainingMutation = {
  __typename?: "Mutation";
  updateTraining?: {
    __typename?: "TrainingDto";
    id: string;
    name: string;
    techStack: TechStack;
  } | null;
};

export type CreateUserMutationVariables = Exact<{
  input: UserCreateInput;
}>;

export type CreateUserMutation = {
  __typename?: "Mutation";
  createUser?: {
    __typename?: "UserDto";
    id?: string | null;
    email?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    middleName?: string | null;
    phoneNumber?: string | null;
    avatarLocation?: string | null;
    roles?: Array<UserRole | null> | null;
    locked?: boolean | null;
  } | null;
};

export type MentorsQueryVariables = Exact<{
  offset: Scalars["Int"];
  limit: Scalars["Int"];
  sort: UserSort;
}>;

export type MentorsQuery = {
  __typename?: "Query";
  mentors?: {
    __typename?: "UsersDto";
    offset?: number | null;
    limit?: number | null;
    totalElements?: any | null;
    items?: Array<{
      __typename?: "UserDto";
      id?: string | null;
      email?: string | null;
      firstName?: string | null;
      middleName?: string | null;
      lastName?: string | null;
      phoneNumber?: string | null;
      locked?: boolean | null;
    } | null> | null;
  } | null;
};

export type UserIdQueryVariables = Exact<{ [key: string]: never }>;

export type UserIdQuery = {
  __typename?: "Query";
  user?: { __typename?: "UserDto"; id?: string | null } | null;
};

export type UserRolesQueryVariables = Exact<{ [key: string]: never }>;

export type UserRolesQuery = {
  __typename?: "Query";
  user?: {
    __typename?: "UserDto";
    roles?: Array<UserRole | null> | null;
  } | null;
};

export type UserQueryVariables = Exact<{ [key: string]: never }>;

export type UserQuery = {
  __typename?: "Query";
  user?: {
    __typename?: "UserDto";
    id?: string | null;
    email?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    middleName?: string | null;
    phoneNumber?: string | null;
    avatarLocation?: string | null;
    roles?: Array<UserRole | null> | null;
    locked?: boolean | null;
  } | null;
};

export const SubCommentHomeWorkDtoFragmentDoc = gql`
  fragment subCommentHomeWorkDto on CommentHomeWorkDto {
    id
    creator {
      id
      email
      firstName
      lastName
      middleName
      avatarLocation
      locked
    }
    content
  }
`;
export const SubCommentHomeWorkDtoRecursiveFragmentDoc = gql`
  fragment subCommentHomeWorkDtoRecursive on CommentHomeWorkDto {
    children {
      ...subCommentHomeWorkDto
      children {
        ...subCommentHomeWorkDto
        children {
          ...subCommentHomeWorkDto
          children {
            ...subCommentHomeWorkDto
            children {
              ...subCommentHomeWorkDto
            }
          }
        }
      }
    }
  }
  ${SubCommentHomeWorkDtoFragmentDoc}
`;
export const ApprovedHomeworkFragmentDoc = gql`
  fragment ApprovedHomework on StudentHomeWorkDto {
    id
    lecture {
      id
      subject
      description
    }
    answer
    status
    student {
      id
      email
      firstName
      middleName
      lastName
    }
    mentor {
      id
      email
      firstName
      middleName
      lastName
    }
    startCheckingDate
    endCheckingDate
  }
`;
export const NotApprovedHomeworkFragmentDoc = gql`
  fragment NotApprovedHomework on StudentHomeWorkDto {
    id
    lecture {
      id
      subject
      description
    }
    answer
    status
    student {
      id
      email
      firstName
      middleName
      lastName
    }
    mentor {
      id
      email
      firstName
      middleName
      lastName
    }
    startCheckingDate
    endCheckingDate
  }
`;
export const NewTakeForReviewHomeWorkFragmentDoc = gql`
  fragment NewTakeForReviewHomeWork on StudentHomeWorkDto {
    id
    lecture {
      id
      subject
      description
    }
    answer
    status
    student {
      id
      email
      firstName
      middleName
      lastName
    }
    mentor {
      id
      email
      firstName
      middleName
      lastName
    }
    startCheckingDate
    endCheckingDate
  }
`;
export const AnswerCommentDocument = gql`
  mutation answerComment($parentID: ID!, $content: String!) {
    answerComment(parentID: $parentID, content: $content) {
      id
      creator {
        id
        email
        firstName
        middleName
        lastName
      }
      creationDate
      content
      homeWork {
        id
        answer
        status
      }
    }
  }
`;
export type AnswerCommentMutationFn = Apollo.MutationFunction<
  AnswerCommentMutation,
  AnswerCommentMutationVariables
>;
export type AnswerCommentComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    AnswerCommentMutation,
    AnswerCommentMutationVariables
  >,
  "mutation"
>;

export const AnswerCommentComponent = (props: AnswerCommentComponentProps) => (
  <ApolloReactComponents.Mutation<
    AnswerCommentMutation,
    AnswerCommentMutationVariables
  >
    mutation={AnswerCommentDocument}
    {...props}
  />
);

/**
 * __useAnswerCommentMutation__
 *
 * To run a mutation, you first call `useAnswerCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAnswerCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [answerCommentMutation, { data, loading, error }] = useAnswerCommentMutation({
 *   variables: {
 *      parentID: // value for 'parentID'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useAnswerCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AnswerCommentMutation,
    AnswerCommentMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AnswerCommentMutation,
    AnswerCommentMutationVariables
  >(AnswerCommentDocument, options);
}
export type AnswerCommentMutationHookResult = ReturnType<
  typeof useAnswerCommentMutation
>;
export type AnswerCommentMutationResult =
  Apollo.MutationResult<AnswerCommentMutation>;
export type AnswerCommentMutationOptions = Apollo.BaseMutationOptions<
  AnswerCommentMutation,
  AnswerCommentMutationVariables
>;
export const CommentsHomeWorkByHomeWorkDocument = gql`
  query commentsHomeWorkByHomeWork(
    $offset: Int!
    $limit: Int!
    $sort: CommentHomeWorkSort!
    $homeWorkId: ID!
  ) {
    commentsHomeWorkByHomeWork(
      offset: $offset
      limit: $limit
      sort: $sort
      homeWorkId: $homeWorkId
    ) {
      items {
        id
        creator {
          id
          firstName
          middleName
          lastName
        }
        creationDate
        content
        homeWork {
          id
        }
      }
      offset
      limit
      totalElements
    }
  }
`;
export type CommentsHomeWorkByHomeWorkComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    CommentsHomeWorkByHomeWorkQuery,
    CommentsHomeWorkByHomeWorkQueryVariables
  >,
  "query"
> &
  (
    | { variables: CommentsHomeWorkByHomeWorkQueryVariables; skip?: boolean }
    | { skip: boolean }
  );

export const CommentsHomeWorkByHomeWorkComponent = (
  props: CommentsHomeWorkByHomeWorkComponentProps
) => (
  <ApolloReactComponents.Query<
    CommentsHomeWorkByHomeWorkQuery,
    CommentsHomeWorkByHomeWorkQueryVariables
  >
    query={CommentsHomeWorkByHomeWorkDocument}
    {...props}
  />
);

/**
 * __useCommentsHomeWorkByHomeWorkQuery__
 *
 * To run a query within a React component, call `useCommentsHomeWorkByHomeWorkQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommentsHomeWorkByHomeWorkQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentsHomeWorkByHomeWorkQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *      sort: // value for 'sort'
 *      homeWorkId: // value for 'homeWorkId'
 *   },
 * });
 */
export function useCommentsHomeWorkByHomeWorkQuery(
  baseOptions: Apollo.QueryHookOptions<
    CommentsHomeWorkByHomeWorkQuery,
    CommentsHomeWorkByHomeWorkQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    CommentsHomeWorkByHomeWorkQuery,
    CommentsHomeWorkByHomeWorkQueryVariables
  >(CommentsHomeWorkByHomeWorkDocument, options);
}
export function useCommentsHomeWorkByHomeWorkLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CommentsHomeWorkByHomeWorkQuery,
    CommentsHomeWorkByHomeWorkQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    CommentsHomeWorkByHomeWorkQuery,
    CommentsHomeWorkByHomeWorkQueryVariables
  >(CommentsHomeWorkByHomeWorkDocument, options);
}
export type CommentsHomeWorkByHomeWorkQueryHookResult = ReturnType<
  typeof useCommentsHomeWorkByHomeWorkQuery
>;
export type CommentsHomeWorkByHomeWorkLazyQueryHookResult = ReturnType<
  typeof useCommentsHomeWorkByHomeWorkLazyQuery
>;
export type CommentsHomeWorkByHomeWorkQueryResult = Apollo.QueryResult<
  CommentsHomeWorkByHomeWorkQuery,
  CommentsHomeWorkByHomeWorkQueryVariables
>;
export const SendCommentDocument = gql`
  mutation sendComment($homeWorkId: ID!, $content: String!) {
    sendComment(homeWorkId: $homeWorkId, content: $content) {
      id
      creator {
        id
        email
        firstName
        middleName
        lastName
      }
      creationDate
      content
      homeWork {
        id
        answer
        status
      }
    }
  }
`;
export type SendCommentMutationFn = Apollo.MutationFunction<
  SendCommentMutation,
  SendCommentMutationVariables
>;
export type SendCommentComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    SendCommentMutation,
    SendCommentMutationVariables
  >,
  "mutation"
>;

export const SendCommentComponent = (props: SendCommentComponentProps) => (
  <ApolloReactComponents.Mutation<
    SendCommentMutation,
    SendCommentMutationVariables
  >
    mutation={SendCommentDocument}
    {...props}
  />
);

/**
 * __useSendCommentMutation__
 *
 * To run a mutation, you first call `useSendCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendCommentMutation, { data, loading, error }] = useSendCommentMutation({
 *   variables: {
 *      homeWorkId: // value for 'homeWorkId'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useSendCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SendCommentMutation,
    SendCommentMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SendCommentMutation, SendCommentMutationVariables>(
    SendCommentDocument,
    options
  );
}
export type SendCommentMutationHookResult = ReturnType<
  typeof useSendCommentMutation
>;
export type SendCommentMutationResult =
  Apollo.MutationResult<SendCommentMutation>;
export type SendCommentMutationOptions = Apollo.BaseMutationOptions<
  SendCommentMutation,
  SendCommentMutationVariables
>;
export const UpdateCommentDocument = gql`
  mutation updateComment($id: ID!, $content: String!) {
    updateComment(id: $id, content: $content) {
      id
      creator {
        id
        email
        firstName
        middleName
        lastName
      }
      creationDate
      content
      homeWork {
        id
        answer
        status
      }
    }
  }
`;
export type UpdateCommentMutationFn = Apollo.MutationFunction<
  UpdateCommentMutation,
  UpdateCommentMutationVariables
>;
export type UpdateCommentComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    UpdateCommentMutation,
    UpdateCommentMutationVariables
  >,
  "mutation"
>;

export const UpdateCommentComponent = (props: UpdateCommentComponentProps) => (
  <ApolloReactComponents.Mutation<
    UpdateCommentMutation,
    UpdateCommentMutationVariables
  >
    mutation={UpdateCommentDocument}
    {...props}
  />
);

/**
 * __useUpdateCommentMutation__
 *
 * To run a mutation, you first call `useUpdateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCommentMutation, { data, loading, error }] = useUpdateCommentMutation({
 *   variables: {
 *      id: // value for 'id'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useUpdateCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateCommentMutation,
    UpdateCommentMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateCommentMutation,
    UpdateCommentMutationVariables
  >(UpdateCommentDocument, options);
}
export type UpdateCommentMutationHookResult = ReturnType<
  typeof useUpdateCommentMutation
>;
export type UpdateCommentMutationResult =
  Apollo.MutationResult<UpdateCommentMutation>;
export type UpdateCommentMutationOptions = Apollo.BaseMutationOptions<
  UpdateCommentMutation,
  UpdateCommentMutationVariables
>;
export const ApprovedDocument = gql`
  mutation approved($homeWorkId: ID!) {
    approved(homeWorkId: $homeWorkId) {
      ...ApprovedHomework
    }
  }
  ${ApprovedHomeworkFragmentDoc}
`;
export type ApprovedMutationFn = Apollo.MutationFunction<
  ApprovedMutation,
  ApprovedMutationVariables
>;
export type ApprovedComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    ApprovedMutation,
    ApprovedMutationVariables
  >,
  "mutation"
>;

export const ApprovedComponent = (props: ApprovedComponentProps) => (
  <ApolloReactComponents.Mutation<ApprovedMutation, ApprovedMutationVariables>
    mutation={ApprovedDocument}
    {...props}
  />
);

/**
 * __useApprovedMutation__
 *
 * To run a mutation, you first call `useApprovedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApprovedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [approvedMutation, { data, loading, error }] = useApprovedMutation({
 *   variables: {
 *      homeWorkId: // value for 'homeWorkId'
 *   },
 * });
 */
export function useApprovedMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ApprovedMutation,
    ApprovedMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ApprovedMutation, ApprovedMutationVariables>(
    ApprovedDocument,
    options
  );
}
export type ApprovedMutationHookResult = ReturnType<typeof useApprovedMutation>;
export type ApprovedMutationResult = Apollo.MutationResult<ApprovedMutation>;
export type ApprovedMutationOptions = Apollo.BaseMutationOptions<
  ApprovedMutation,
  ApprovedMutationVariables
>;
export const HomeWorkByLectureDocument = gql`
  query homeWorkByLecture($lectureId: ID!) {
    homeWorkByLecture(lectureId: $lectureId) {
      id
      lecture {
        id
        subject
      }
      answer
      status
      student {
        id
        firstName
        middleName
        lastName
      }
      mentor {
        id
        firstName
        middleName
        lastName
      }
      creationDate
      startCheckingDate
      endCheckingDate
    }
  }
`;
export type HomeWorkByLectureComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    HomeWorkByLectureQuery,
    HomeWorkByLectureQueryVariables
  >,
  "query"
> &
  (
    | { variables: HomeWorkByLectureQueryVariables; skip?: boolean }
    | { skip: boolean }
  );

export const HomeWorkByLectureComponent = (
  props: HomeWorkByLectureComponentProps
) => (
  <ApolloReactComponents.Query<
    HomeWorkByLectureQuery,
    HomeWorkByLectureQueryVariables
  >
    query={HomeWorkByLectureDocument}
    {...props}
  />
);

/**
 * __useHomeWorkByLectureQuery__
 *
 * To run a query within a React component, call `useHomeWorkByLectureQuery` and pass it any options that fit your needs.
 * When your component renders, `useHomeWorkByLectureQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHomeWorkByLectureQuery({
 *   variables: {
 *      lectureId: // value for 'lectureId'
 *   },
 * });
 */
export function useHomeWorkByLectureQuery(
  baseOptions: Apollo.QueryHookOptions<
    HomeWorkByLectureQuery,
    HomeWorkByLectureQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    HomeWorkByLectureQuery,
    HomeWorkByLectureQueryVariables
  >(HomeWorkByLectureDocument, options);
}
export function useHomeWorkByLectureLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    HomeWorkByLectureQuery,
    HomeWorkByLectureQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    HomeWorkByLectureQuery,
    HomeWorkByLectureQueryVariables
  >(HomeWorkByLectureDocument, options);
}
export type HomeWorkByLectureQueryHookResult = ReturnType<
  typeof useHomeWorkByLectureQuery
>;
export type HomeWorkByLectureLazyQueryHookResult = ReturnType<
  typeof useHomeWorkByLectureLazyQuery
>;
export type HomeWorkByLectureQueryResult = Apollo.QueryResult<
  HomeWorkByLectureQuery,
  HomeWorkByLectureQueryVariables
>;
export const HomeWorkDocument = gql`
  query homeWork($homeWorkId: ID!) {
    homeWork(id: $homeWorkId) {
      id
      lecture {
        id
        subject
        contentHomeWork {
          url
          value
          type
        }
      }
      answer
      status
      student {
        id
        firstName
        middleName
        lastName
      }
      mentor {
        id
        firstName
        middleName
        lastName
      }
      creationDate
      startCheckingDate
      endCheckingDate
    }
  }
`;
export type HomeWorkComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    HomeWorkQuery,
    HomeWorkQueryVariables
  >,
  "query"
> &
  ({ variables: HomeWorkQueryVariables; skip?: boolean } | { skip: boolean });

export const HomeWorkComponent = (props: HomeWorkComponentProps) => (
  <ApolloReactComponents.Query<HomeWorkQuery, HomeWorkQueryVariables>
    query={HomeWorkDocument}
    {...props}
  />
);

/**
 * __useHomeWorkQuery__
 *
 * To run a query within a React component, call `useHomeWorkQuery` and pass it any options that fit your needs.
 * When your component renders, `useHomeWorkQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHomeWorkQuery({
 *   variables: {
 *      homeWorkId: // value for 'homeWorkId'
 *   },
 * });
 */
export function useHomeWorkQuery(
  baseOptions: Apollo.QueryHookOptions<HomeWorkQuery, HomeWorkQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<HomeWorkQuery, HomeWorkQueryVariables>(
    HomeWorkDocument,
    options
  );
}
export function useHomeWorkLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    HomeWorkQuery,
    HomeWorkQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<HomeWorkQuery, HomeWorkQueryVariables>(
    HomeWorkDocument,
    options
  );
}
export type HomeWorkQueryHookResult = ReturnType<typeof useHomeWorkQuery>;
export type HomeWorkLazyQueryHookResult = ReturnType<
  typeof useHomeWorkLazyQuery
>;
export type HomeWorkQueryResult = Apollo.QueryResult<
  HomeWorkQuery,
  HomeWorkQueryVariables
>;
export const HomeWorksByLectureIdDocument = gql`
  query homeWorksByLectureId(
    $offset: Int!
    $limit: Int!
    $sort: StudentHomeWorkSort!
    $lectureId: ID!
  ) {
    homeWorksByLectureId(
      offset: $offset
      limit: $limit
      sort: $sort
      lectureId: $lectureId
    ) {
      items {
        id
        answer
        status
        student {
          id
          firstName
          middleName
          lastName
        }
        mentor {
          id
          firstName
          middleName
          lastName
        }
        creationDate
        startCheckingDate
        endCheckingDate
      }
      offset
      limit
      totalElements
    }
  }
`;
export type HomeWorksByLectureIdComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    HomeWorksByLectureIdQuery,
    HomeWorksByLectureIdQueryVariables
  >,
  "query"
> &
  (
    | { variables: HomeWorksByLectureIdQueryVariables; skip?: boolean }
    | { skip: boolean }
  );

export const HomeWorksByLectureIdComponent = (
  props: HomeWorksByLectureIdComponentProps
) => (
  <ApolloReactComponents.Query<
    HomeWorksByLectureIdQuery,
    HomeWorksByLectureIdQueryVariables
  >
    query={HomeWorksByLectureIdDocument}
    {...props}
  />
);

/**
 * __useHomeWorksByLectureIdQuery__
 *
 * To run a query within a React component, call `useHomeWorksByLectureIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useHomeWorksByLectureIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHomeWorksByLectureIdQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *      sort: // value for 'sort'
 *      lectureId: // value for 'lectureId'
 *   },
 * });
 */
export function useHomeWorksByLectureIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    HomeWorksByLectureIdQuery,
    HomeWorksByLectureIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    HomeWorksByLectureIdQuery,
    HomeWorksByLectureIdQueryVariables
  >(HomeWorksByLectureIdDocument, options);
}
export function useHomeWorksByLectureIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    HomeWorksByLectureIdQuery,
    HomeWorksByLectureIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    HomeWorksByLectureIdQuery,
    HomeWorksByLectureIdQueryVariables
  >(HomeWorksByLectureIdDocument, options);
}
export type HomeWorksByLectureIdQueryHookResult = ReturnType<
  typeof useHomeWorksByLectureIdQuery
>;
export type HomeWorksByLectureIdLazyQueryHookResult = ReturnType<
  typeof useHomeWorksByLectureIdLazyQuery
>;
export type HomeWorksByLectureIdQueryResult = Apollo.QueryResult<
  HomeWorksByLectureIdQuery,
  HomeWorksByLectureIdQueryVariables
>;
export const HomeWorksDocument = gql`
  query homeWorks(
    $offset: Int!
    $limit: Int!
    $sort: StudentHomeWorkSort
    $filter: StudentHomeWorkFilter
  ) {
    homeWorks(offset: $offset, limit: $limit, sort: $sort, filter: $filter) {
      offset
      limit
      totalElements
      items {
        id
        lecture {
          id
          subject
          description
          contentHomeWork {
            url
            value
            type
          }
        }
        answer
        status
        student {
          id
          firstName
          middleName
          lastName
        }
        mentor {
          id
          firstName
          middleName
          lastName
        }
        creationDate
        startCheckingDate
        endCheckingDate
      }
    }
  }
`;
export type HomeWorksComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    HomeWorksQuery,
    HomeWorksQueryVariables
  >,
  "query"
> &
  ({ variables: HomeWorksQueryVariables; skip?: boolean } | { skip: boolean });

export const HomeWorksComponent = (props: HomeWorksComponentProps) => (
  <ApolloReactComponents.Query<HomeWorksQuery, HomeWorksQueryVariables>
    query={HomeWorksDocument}
    {...props}
  />
);

/**
 * __useHomeWorksQuery__
 *
 * To run a query within a React component, call `useHomeWorksQuery` and pass it any options that fit your needs.
 * When your component renders, `useHomeWorksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHomeWorksQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *      sort: // value for 'sort'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useHomeWorksQuery(
  baseOptions: Apollo.QueryHookOptions<HomeWorksQuery, HomeWorksQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<HomeWorksQuery, HomeWorksQueryVariables>(
    HomeWorksDocument,
    options
  );
}
export function useHomeWorksLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    HomeWorksQuery,
    HomeWorksQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<HomeWorksQuery, HomeWorksQueryVariables>(
    HomeWorksDocument,
    options
  );
}
export type HomeWorksQueryHookResult = ReturnType<typeof useHomeWorksQuery>;
export type HomeWorksLazyQueryHookResult = ReturnType<
  typeof useHomeWorksLazyQuery
>;
export type HomeWorksQueryResult = Apollo.QueryResult<
  HomeWorksQuery,
  HomeWorksQueryVariables
>;
export const NotApprovedDocument = gql`
  mutation notApproved($homeWorkId: ID!) {
    notApproved(homeWorkId: $homeWorkId) {
      ...NotApprovedHomework
    }
  }
  ${NotApprovedHomeworkFragmentDoc}
`;
export type NotApprovedMutationFn = Apollo.MutationFunction<
  NotApprovedMutation,
  NotApprovedMutationVariables
>;
export type NotApprovedComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    NotApprovedMutation,
    NotApprovedMutationVariables
  >,
  "mutation"
>;

export const NotApprovedComponent = (props: NotApprovedComponentProps) => (
  <ApolloReactComponents.Mutation<
    NotApprovedMutation,
    NotApprovedMutationVariables
  >
    mutation={NotApprovedDocument}
    {...props}
  />
);

/**
 * __useNotApprovedMutation__
 *
 * To run a mutation, you first call `useNotApprovedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNotApprovedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [notApprovedMutation, { data, loading, error }] = useNotApprovedMutation({
 *   variables: {
 *      homeWorkId: // value for 'homeWorkId'
 *   },
 * });
 */
export function useNotApprovedMutation(
  baseOptions?: Apollo.MutationHookOptions<
    NotApprovedMutation,
    NotApprovedMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<NotApprovedMutation, NotApprovedMutationVariables>(
    NotApprovedDocument,
    options
  );
}
export type NotApprovedMutationHookResult = ReturnType<
  typeof useNotApprovedMutation
>;
export type NotApprovedMutationResult =
  Apollo.MutationResult<NotApprovedMutation>;
export type NotApprovedMutationOptions = Apollo.BaseMutationOptions<
  NotApprovedMutation,
  NotApprovedMutationVariables
>;
export const SendHomeWorkToCheckDocument = gql`
  mutation sendHomeWorkToCheck($lectureId: ID!, $content: String!) {
    sendHomeWorkToCheck(lectureId: $lectureId, content: $content) {
      id
      lecture {
        id
        subject
        description
      }
      answer
      status
      student {
        id
        firstName
        middleName
        lastName
      }
      mentor {
        id
        firstName
        middleName
        lastName
      }
      startCheckingDate
      endCheckingDate
    }
  }
`;
export type SendHomeWorkToCheckMutationFn = Apollo.MutationFunction<
  SendHomeWorkToCheckMutation,
  SendHomeWorkToCheckMutationVariables
>;
export type SendHomeWorkToCheckComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    SendHomeWorkToCheckMutation,
    SendHomeWorkToCheckMutationVariables
  >,
  "mutation"
>;

export const SendHomeWorkToCheckComponent = (
  props: SendHomeWorkToCheckComponentProps
) => (
  <ApolloReactComponents.Mutation<
    SendHomeWorkToCheckMutation,
    SendHomeWorkToCheckMutationVariables
  >
    mutation={SendHomeWorkToCheckDocument}
    {...props}
  />
);

/**
 * __useSendHomeWorkToCheckMutation__
 *
 * To run a mutation, you first call `useSendHomeWorkToCheckMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendHomeWorkToCheckMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendHomeWorkToCheckMutation, { data, loading, error }] = useSendHomeWorkToCheckMutation({
 *   variables: {
 *      lectureId: // value for 'lectureId'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useSendHomeWorkToCheckMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SendHomeWorkToCheckMutation,
    SendHomeWorkToCheckMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SendHomeWorkToCheckMutation,
    SendHomeWorkToCheckMutationVariables
  >(SendHomeWorkToCheckDocument, options);
}
export type SendHomeWorkToCheckMutationHookResult = ReturnType<
  typeof useSendHomeWorkToCheckMutation
>;
export type SendHomeWorkToCheckMutationResult =
  Apollo.MutationResult<SendHomeWorkToCheckMutation>;
export type SendHomeWorkToCheckMutationOptions = Apollo.BaseMutationOptions<
  SendHomeWorkToCheckMutation,
  SendHomeWorkToCheckMutationVariables
>;
export const TakeForReviewDocument = gql`
  mutation takeForReview($homeworkId: ID!) {
    takeForReview(homeWorkId: $homeworkId) {
      ...NewTakeForReviewHomeWork
    }
  }
  ${NewTakeForReviewHomeWorkFragmentDoc}
`;
export type TakeForReviewMutationFn = Apollo.MutationFunction<
  TakeForReviewMutation,
  TakeForReviewMutationVariables
>;
export type TakeForReviewComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    TakeForReviewMutation,
    TakeForReviewMutationVariables
  >,
  "mutation"
>;

export const TakeForReviewComponent = (props: TakeForReviewComponentProps) => (
  <ApolloReactComponents.Mutation<
    TakeForReviewMutation,
    TakeForReviewMutationVariables
  >
    mutation={TakeForReviewDocument}
    {...props}
  />
);

/**
 * __useTakeForReviewMutation__
 *
 * To run a mutation, you first call `useTakeForReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTakeForReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [takeForReviewMutation, { data, loading, error }] = useTakeForReviewMutation({
 *   variables: {
 *      homeworkId: // value for 'homeworkId'
 *   },
 * });
 */
export function useTakeForReviewMutation(
  baseOptions?: Apollo.MutationHookOptions<
    TakeForReviewMutation,
    TakeForReviewMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    TakeForReviewMutation,
    TakeForReviewMutationVariables
  >(TakeForReviewDocument, options);
}
export type TakeForReviewMutationHookResult = ReturnType<
  typeof useTakeForReviewMutation
>;
export type TakeForReviewMutationResult =
  Apollo.MutationResult<TakeForReviewMutation>;
export type TakeForReviewMutationOptions = Apollo.BaseMutationOptions<
  TakeForReviewMutation,
  TakeForReviewMutationVariables
>;
export const UpdateHomeworkDocument = gql`
  mutation updateHomework($id: ID!, $content: String!) {
    updateHomeWork(id: $id, content: $content) {
      id
      lecture {
        id
        subject
        description
      }
      answer
      status
      student {
        id
        firstName
        middleName
        lastName
      }
      mentor {
        id
        firstName
        middleName
        lastName
      }
      startCheckingDate
      endCheckingDate
    }
  }
`;
export type UpdateHomeworkMutationFn = Apollo.MutationFunction<
  UpdateHomeworkMutation,
  UpdateHomeworkMutationVariables
>;
export type UpdateHomeworkComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    UpdateHomeworkMutation,
    UpdateHomeworkMutationVariables
  >,
  "mutation"
>;

export const UpdateHomeworkComponent = (
  props: UpdateHomeworkComponentProps
) => (
  <ApolloReactComponents.Mutation<
    UpdateHomeworkMutation,
    UpdateHomeworkMutationVariables
  >
    mutation={UpdateHomeworkDocument}
    {...props}
  />
);

/**
 * __useUpdateHomeworkMutation__
 *
 * To run a mutation, you first call `useUpdateHomeworkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateHomeworkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateHomeworkMutation, { data, loading, error }] = useUpdateHomeworkMutation({
 *   variables: {
 *      id: // value for 'id'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useUpdateHomeworkMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateHomeworkMutation,
    UpdateHomeworkMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateHomeworkMutation,
    UpdateHomeworkMutationVariables
  >(UpdateHomeworkDocument, options);
}
export type UpdateHomeworkMutationHookResult = ReturnType<
  typeof useUpdateHomeworkMutation
>;
export type UpdateHomeworkMutationResult =
  Apollo.MutationResult<UpdateHomeworkMutation>;
export type UpdateHomeworkMutationOptions = Apollo.BaseMutationOptions<
  UpdateHomeworkMutation,
  UpdateHomeworkMutationVariables
>;
export const LectureHomeWorkDocument = gql`
  query lectureHomeWork($lectureId: ID!) {
    lectureHomeWork(lectureId: $lectureId) {
      type
      value
      url
    }
  }
`;
export type LectureHomeWorkComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    LectureHomeWorkQuery,
    LectureHomeWorkQueryVariables
  >,
  "query"
> &
  (
    | { variables: LectureHomeWorkQueryVariables; skip?: boolean }
    | { skip: boolean }
  );

export const LectureHomeWorkComponent = (
  props: LectureHomeWorkComponentProps
) => (
  <ApolloReactComponents.Query<
    LectureHomeWorkQuery,
    LectureHomeWorkQueryVariables
  >
    query={LectureHomeWorkDocument}
    {...props}
  />
);

/**
 * __useLectureHomeWorkQuery__
 *
 * To run a query within a React component, call `useLectureHomeWorkQuery` and pass it any options that fit your needs.
 * When your component renders, `useLectureHomeWorkQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLectureHomeWorkQuery({
 *   variables: {
 *      lectureId: // value for 'lectureId'
 *   },
 * });
 */
export function useLectureHomeWorkQuery(
  baseOptions: Apollo.QueryHookOptions<
    LectureHomeWorkQuery,
    LectureHomeWorkQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<LectureHomeWorkQuery, LectureHomeWorkQueryVariables>(
    LectureHomeWorkDocument,
    options
  );
}
export function useLectureHomeWorkLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    LectureHomeWorkQuery,
    LectureHomeWorkQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    LectureHomeWorkQuery,
    LectureHomeWorkQueryVariables
  >(LectureHomeWorkDocument, options);
}
export type LectureHomeWorkQueryHookResult = ReturnType<
  typeof useLectureHomeWorkQuery
>;
export type LectureHomeWorkLazyQueryHookResult = ReturnType<
  typeof useLectureHomeWorkLazyQuery
>;
export type LectureHomeWorkQueryResult = Apollo.QueryResult<
  LectureHomeWorkQuery,
  LectureHomeWorkQueryVariables
>;
export const LectureDocument = gql`
  query lecture($id: ID!) {
    lecture(id: $id) {
      id
      speakers {
        id
        firstName
        lastName
        middleName
      }
      subject
      homeWorkLevel {
        id
        code
        description
        estimate
      }
      description
      content {
        type
        value
        url
      }
    }
  }
`;
export type LectureComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    LectureQuery,
    LectureQueryVariables
  >,
  "query"
> &
  ({ variables: LectureQueryVariables; skip?: boolean } | { skip: boolean });

export const LectureComponent = (props: LectureComponentProps) => (
  <ApolloReactComponents.Query<LectureQuery, LectureQueryVariables>
    query={LectureDocument}
    {...props}
  />
);

/**
 * __useLectureQuery__
 *
 * To run a query within a React component, call `useLectureQuery` and pass it any options that fit your needs.
 * When your component renders, `useLectureQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLectureQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLectureQuery(
  baseOptions: Apollo.QueryHookOptions<LectureQuery, LectureQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<LectureQuery, LectureQueryVariables>(
    LectureDocument,
    options
  );
}
export function useLectureLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<LectureQuery, LectureQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<LectureQuery, LectureQueryVariables>(
    LectureDocument,
    options
  );
}
export type LectureQueryHookResult = ReturnType<typeof useLectureQuery>;
export type LectureLazyQueryHookResult = ReturnType<typeof useLectureLazyQuery>;
export type LectureQueryResult = Apollo.QueryResult<
  LectureQuery,
  LectureQueryVariables
>;
export const UpdateLectureDocument = gql`
  mutation updateLecture($input: LectureInput!) {
    updateLecture(input: $input) {
      id
      speakers {
        id
        firstName
        lastName
        middleName
      }
      homeWorkLevel {
        id
        code
        description
        estimate
      }
      subject
      description
      content {
        type
        value
        url
      }
      contentHomeWork {
        type
        value
        url
      }
    }
  }
`;
export type UpdateLectureMutationFn = Apollo.MutationFunction<
  UpdateLectureMutation,
  UpdateLectureMutationVariables
>;
export type UpdateLectureComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    UpdateLectureMutation,
    UpdateLectureMutationVariables
  >,
  "mutation"
>;

export const UpdateLectureComponent = (props: UpdateLectureComponentProps) => (
  <ApolloReactComponents.Mutation<
    UpdateLectureMutation,
    UpdateLectureMutationVariables
  >
    mutation={UpdateLectureDocument}
    {...props}
  />
);

/**
 * __useUpdateLectureMutation__
 *
 * To run a mutation, you first call `useUpdateLectureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLectureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLectureMutation, { data, loading, error }] = useUpdateLectureMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateLectureMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateLectureMutation,
    UpdateLectureMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateLectureMutation,
    UpdateLectureMutationVariables
  >(UpdateLectureDocument, options);
}
export type UpdateLectureMutationHookResult = ReturnType<
  typeof useUpdateLectureMutation
>;
export type UpdateLectureMutationResult =
  Apollo.MutationResult<UpdateLectureMutation>;
export type UpdateLectureMutationOptions = Apollo.BaseMutationOptions<
  UpdateLectureMutation,
  UpdateLectureMutationVariables
>;
export const TrainingLecturesDocument = gql`
  query trainingLectures($id: ID!) {
    trainingLectures(id: $id) {
      id
      number
      lecture {
        id
        subject
        description
      }
      lastLecture {
        id
        subject
        description
      }
      locking
    }
  }
`;
export type TrainingLecturesComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    TrainingLecturesQuery,
    TrainingLecturesQueryVariables
  >,
  "query"
> &
  (
    | { variables: TrainingLecturesQueryVariables; skip?: boolean }
    | { skip: boolean }
  );

export const TrainingLecturesComponent = (
  props: TrainingLecturesComponentProps
) => (
  <ApolloReactComponents.Query<
    TrainingLecturesQuery,
    TrainingLecturesQueryVariables
  >
    query={TrainingLecturesDocument}
    {...props}
  />
);

/**
 * __useTrainingLecturesQuery__
 *
 * To run a query within a React component, call `useTrainingLecturesQuery` and pass it any options that fit your needs.
 * When your component renders, `useTrainingLecturesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTrainingLecturesQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTrainingLecturesQuery(
  baseOptions: Apollo.QueryHookOptions<
    TrainingLecturesQuery,
    TrainingLecturesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<TrainingLecturesQuery, TrainingLecturesQueryVariables>(
    TrainingLecturesDocument,
    options
  );
}
export function useTrainingLecturesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    TrainingLecturesQuery,
    TrainingLecturesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    TrainingLecturesQuery,
    TrainingLecturesQueryVariables
  >(TrainingLecturesDocument, options);
}
export type TrainingLecturesQueryHookResult = ReturnType<
  typeof useTrainingLecturesQuery
>;
export type TrainingLecturesLazyQueryHookResult = ReturnType<
  typeof useTrainingLecturesLazyQuery
>;
export type TrainingLecturesQueryResult = Apollo.QueryResult<
  TrainingLecturesQuery,
  TrainingLecturesQueryVariables
>;
export const TrainingPurchasesDocument = gql`
  query trainingPurchases {
    trainingPurchases {
      id
      user {
        id
        email
        firstName
        lastName
        middleName
      }
      trainingTariff {
        id
        name
        code
        price
        homeWork
        description
        training {
          id
          name
        }
      }
    }
  }
`;
export type TrainingPurchasesComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    TrainingPurchasesQuery,
    TrainingPurchasesQueryVariables
  >,
  "query"
>;

export const TrainingPurchasesComponent = (
  props: TrainingPurchasesComponentProps
) => (
  <ApolloReactComponents.Query<
    TrainingPurchasesQuery,
    TrainingPurchasesQueryVariables
  >
    query={TrainingPurchasesDocument}
    {...props}
  />
);

/**
 * __useTrainingPurchasesQuery__
 *
 * To run a query within a React component, call `useTrainingPurchasesQuery` and pass it any options that fit your needs.
 * When your component renders, `useTrainingPurchasesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTrainingPurchasesQuery({
 *   variables: {
 *   },
 * });
 */
export function useTrainingPurchasesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    TrainingPurchasesQuery,
    TrainingPurchasesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    TrainingPurchasesQuery,
    TrainingPurchasesQueryVariables
  >(TrainingPurchasesDocument, options);
}
export function useTrainingPurchasesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    TrainingPurchasesQuery,
    TrainingPurchasesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    TrainingPurchasesQuery,
    TrainingPurchasesQueryVariables
  >(TrainingPurchasesDocument, options);
}
export type TrainingPurchasesQueryHookResult = ReturnType<
  typeof useTrainingPurchasesQuery
>;
export type TrainingPurchasesLazyQueryHookResult = ReturnType<
  typeof useTrainingPurchasesLazyQuery
>;
export type TrainingPurchasesQueryResult = Apollo.QueryResult<
  TrainingPurchasesQuery,
  TrainingPurchasesQueryVariables
>;
export const TrainingDocument = gql`
  query training($id: ID!) {
    training(id: $id) {
      id
      name
      content
      techStack
      tariffs {
        id
        name
        code
        price
        homeWork
        description
      }
      mentors {
        id
        firstName
        lastName
        middleName
      }
    }
  }
`;
export type TrainingComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    TrainingQuery,
    TrainingQueryVariables
  >,
  "query"
> &
  ({ variables: TrainingQueryVariables; skip?: boolean } | { skip: boolean });

export const TrainingComponent = (props: TrainingComponentProps) => (
  <ApolloReactComponents.Query<TrainingQuery, TrainingQueryVariables>
    query={TrainingDocument}
    {...props}
  />
);

/**
 * __useTrainingQuery__
 *
 * To run a query within a React component, call `useTrainingQuery` and pass it any options that fit your needs.
 * When your component renders, `useTrainingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTrainingQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTrainingQuery(
  baseOptions: Apollo.QueryHookOptions<TrainingQuery, TrainingQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<TrainingQuery, TrainingQueryVariables>(
    TrainingDocument,
    options
  );
}
export function useTrainingLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    TrainingQuery,
    TrainingQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<TrainingQuery, TrainingQueryVariables>(
    TrainingDocument,
    options
  );
}
export type TrainingQueryHookResult = ReturnType<typeof useTrainingQuery>;
export type TrainingLazyQueryHookResult = ReturnType<
  typeof useTrainingLazyQuery
>;
export type TrainingQueryResult = Apollo.QueryResult<
  TrainingQuery,
  TrainingQueryVariables
>;
export const TrainingsByMentorDocument = gql`
  query trainingsByMentor($offset: Int!, $limit: Int!, $sort: TrainingSort) {
    trainingsByMentor(offset: $offset, limit: $limit, sort: $sort) {
      offset
      limit
      totalElements
      items {
        id
        name
        content
        techStack
        mentors {
          id
          firstName
          middleName
          lastName
        }
      }
    }
  }
`;
export type TrainingsByMentorComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    TrainingsByMentorQuery,
    TrainingsByMentorQueryVariables
  >,
  "query"
> &
  (
    | { variables: TrainingsByMentorQueryVariables; skip?: boolean }
    | { skip: boolean }
  );

export const TrainingsByMentorComponent = (
  props: TrainingsByMentorComponentProps
) => (
  <ApolloReactComponents.Query<
    TrainingsByMentorQuery,
    TrainingsByMentorQueryVariables
  >
    query={TrainingsByMentorDocument}
    {...props}
  />
);

/**
 * __useTrainingsByMentorQuery__
 *
 * To run a query within a React component, call `useTrainingsByMentorQuery` and pass it any options that fit your needs.
 * When your component renders, `useTrainingsByMentorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTrainingsByMentorQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useTrainingsByMentorQuery(
  baseOptions: Apollo.QueryHookOptions<
    TrainingsByMentorQuery,
    TrainingsByMentorQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    TrainingsByMentorQuery,
    TrainingsByMentorQueryVariables
  >(TrainingsByMentorDocument, options);
}
export function useTrainingsByMentorLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    TrainingsByMentorQuery,
    TrainingsByMentorQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    TrainingsByMentorQuery,
    TrainingsByMentorQueryVariables
  >(TrainingsByMentorDocument, options);
}
export type TrainingsByMentorQueryHookResult = ReturnType<
  typeof useTrainingsByMentorQuery
>;
export type TrainingsByMentorLazyQueryHookResult = ReturnType<
  typeof useTrainingsByMentorLazyQuery
>;
export type TrainingsByMentorQueryResult = Apollo.QueryResult<
  TrainingsByMentorQuery,
  TrainingsByMentorQueryVariables
>;
export const TrainingsDocument = gql`
  query trainings($offset: Int!, $limit: Int!, $sort: TrainingSort) {
    trainings(offset: $offset, limit: $limit, sort: $sort) {
      items {
        id
        name
        techStack
      }
      totalElements
    }
  }
`;
export type TrainingsComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    TrainingsQuery,
    TrainingsQueryVariables
  >,
  "query"
> &
  ({ variables: TrainingsQueryVariables; skip?: boolean } | { skip: boolean });

export const TrainingsComponent = (props: TrainingsComponentProps) => (
  <ApolloReactComponents.Query<TrainingsQuery, TrainingsQueryVariables>
    query={TrainingsDocument}
    {...props}
  />
);

/**
 * __useTrainingsQuery__
 *
 * To run a query within a React component, call `useTrainingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTrainingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTrainingsQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useTrainingsQuery(
  baseOptions: Apollo.QueryHookOptions<TrainingsQuery, TrainingsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<TrainingsQuery, TrainingsQueryVariables>(
    TrainingsDocument,
    options
  );
}
export function useTrainingsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    TrainingsQuery,
    TrainingsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<TrainingsQuery, TrainingsQueryVariables>(
    TrainingsDocument,
    options
  );
}
export type TrainingsQueryHookResult = ReturnType<typeof useTrainingsQuery>;
export type TrainingsLazyQueryHookResult = ReturnType<
  typeof useTrainingsLazyQuery
>;
export type TrainingsQueryResult = Apollo.QueryResult<
  TrainingsQuery,
  TrainingsQueryVariables
>;
export const UpdateTrainingDocument = gql`
  mutation updateTraining($input: TrainingInput!) {
    updateTraining(input: $input) {
      id
      name
      techStack
    }
  }
`;
export type UpdateTrainingMutationFn = Apollo.MutationFunction<
  UpdateTrainingMutation,
  UpdateTrainingMutationVariables
>;
export type UpdateTrainingComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    UpdateTrainingMutation,
    UpdateTrainingMutationVariables
  >,
  "mutation"
>;

export const UpdateTrainingComponent = (
  props: UpdateTrainingComponentProps
) => (
  <ApolloReactComponents.Mutation<
    UpdateTrainingMutation,
    UpdateTrainingMutationVariables
  >
    mutation={UpdateTrainingDocument}
    {...props}
  />
);

/**
 * __useUpdateTrainingMutation__
 *
 * To run a mutation, you first call `useUpdateTrainingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTrainingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTrainingMutation, { data, loading, error }] = useUpdateTrainingMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTrainingMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateTrainingMutation,
    UpdateTrainingMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateTrainingMutation,
    UpdateTrainingMutationVariables
  >(UpdateTrainingDocument, options);
}
export type UpdateTrainingMutationHookResult = ReturnType<
  typeof useUpdateTrainingMutation
>;
export type UpdateTrainingMutationResult =
  Apollo.MutationResult<UpdateTrainingMutation>;
export type UpdateTrainingMutationOptions = Apollo.BaseMutationOptions<
  UpdateTrainingMutation,
  UpdateTrainingMutationVariables
>;
export const CreateUserDocument = gql`
  mutation createUser($input: UserCreateInput!) {
    createUser(input: $input) {
      id
      email
      firstName
      lastName
      middleName
      phoneNumber
      avatarLocation
      roles
      locked
    }
  }
`;
export type CreateUserMutationFn = Apollo.MutationFunction<
  CreateUserMutation,
  CreateUserMutationVariables
>;
export type CreateUserComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    CreateUserMutation,
    CreateUserMutationVariables
  >,
  "mutation"
>;

export const CreateUserComponent = (props: CreateUserComponentProps) => (
  <ApolloReactComponents.Mutation<
    CreateUserMutation,
    CreateUserMutationVariables
  >
    mutation={CreateUserDocument}
    {...props}
  />
);

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateUserMutation,
    CreateUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(
    CreateUserDocument,
    options
  );
}
export type CreateUserMutationHookResult = ReturnType<
  typeof useCreateUserMutation
>;
export type CreateUserMutationResult =
  Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<
  CreateUserMutation,
  CreateUserMutationVariables
>;
export const MentorsDocument = gql`
  query mentors($offset: Int!, $limit: Int!, $sort: UserSort!) {
    mentors(offset: $offset, limit: $limit, sort: $sort) {
      offset
      limit
      totalElements
      items {
        id
        email
        firstName
        middleName
        lastName
        phoneNumber
        locked
      }
    }
  }
`;
export type MentorsComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    MentorsQuery,
    MentorsQueryVariables
  >,
  "query"
> &
  ({ variables: MentorsQueryVariables; skip?: boolean } | { skip: boolean });

export const MentorsComponent = (props: MentorsComponentProps) => (
  <ApolloReactComponents.Query<MentorsQuery, MentorsQueryVariables>
    query={MentorsDocument}
    {...props}
  />
);

/**
 * __useMentorsQuery__
 *
 * To run a query within a React component, call `useMentorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMentorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMentorsQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useMentorsQuery(
  baseOptions: Apollo.QueryHookOptions<MentorsQuery, MentorsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MentorsQuery, MentorsQueryVariables>(
    MentorsDocument,
    options
  );
}
export function useMentorsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MentorsQuery, MentorsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MentorsQuery, MentorsQueryVariables>(
    MentorsDocument,
    options
  );
}
export type MentorsQueryHookResult = ReturnType<typeof useMentorsQuery>;
export type MentorsLazyQueryHookResult = ReturnType<typeof useMentorsLazyQuery>;
export type MentorsQueryResult = Apollo.QueryResult<
  MentorsQuery,
  MentorsQueryVariables
>;
export const UserIdDocument = gql`
  query userId {
    user {
      id
    }
  }
`;
export type UserIdComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    UserIdQuery,
    UserIdQueryVariables
  >,
  "query"
>;

export const UserIdComponent = (props: UserIdComponentProps) => (
  <ApolloReactComponents.Query<UserIdQuery, UserIdQueryVariables>
    query={UserIdDocument}
    {...props}
  />
);

/**
 * __useUserIdQuery__
 *
 * To run a query within a React component, call `useUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserIdQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserIdQuery(
  baseOptions?: Apollo.QueryHookOptions<UserIdQuery, UserIdQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserIdQuery, UserIdQueryVariables>(
    UserIdDocument,
    options
  );
}
export function useUserIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserIdQuery, UserIdQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserIdQuery, UserIdQueryVariables>(
    UserIdDocument,
    options
  );
}
export type UserIdQueryHookResult = ReturnType<typeof useUserIdQuery>;
export type UserIdLazyQueryHookResult = ReturnType<typeof useUserIdLazyQuery>;
export type UserIdQueryResult = Apollo.QueryResult<
  UserIdQuery,
  UserIdQueryVariables
>;
export const UserRolesDocument = gql`
  query userRoles {
    user {
      roles
    }
  }
`;
export type UserRolesComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    UserRolesQuery,
    UserRolesQueryVariables
  >,
  "query"
>;

export const UserRolesComponent = (props: UserRolesComponentProps) => (
  <ApolloReactComponents.Query<UserRolesQuery, UserRolesQueryVariables>
    query={UserRolesDocument}
    {...props}
  />
);

/**
 * __useUserRolesQuery__
 *
 * To run a query within a React component, call `useUserRolesQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserRolesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserRolesQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserRolesQuery(
  baseOptions?: Apollo.QueryHookOptions<UserRolesQuery, UserRolesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserRolesQuery, UserRolesQueryVariables>(
    UserRolesDocument,
    options
  );
}
export function useUserRolesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    UserRolesQuery,
    UserRolesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserRolesQuery, UserRolesQueryVariables>(
    UserRolesDocument,
    options
  );
}
export type UserRolesQueryHookResult = ReturnType<typeof useUserRolesQuery>;
export type UserRolesLazyQueryHookResult = ReturnType<
  typeof useUserRolesLazyQuery
>;
export type UserRolesQueryResult = Apollo.QueryResult<
  UserRolesQuery,
  UserRolesQueryVariables
>;
export const UserDocument = gql`
  query user {
    user {
      id
      email
      firstName
      lastName
      middleName
      phoneNumber
      avatarLocation
      roles
      locked
    }
  }
`;
export type UserComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<UserQuery, UserQueryVariables>,
  "query"
>;

export const UserComponent = (props: UserComponentProps) => (
  <ApolloReactComponents.Query<UserQuery, UserQueryVariables>
    query={UserDocument}
    {...props}
  />
);

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserQuery(
  baseOptions?: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
}
export function useUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(
    UserDocument,
    options
  );
}
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
