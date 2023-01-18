import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
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
  totalElements?: Maybe<Scalars["Long"]>;
  totalPages?: Maybe<Scalars["Int"]>;
};

export type ContentFileDto = {
  __typename?: "ContentFileDto";
  fileLocation?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  size?: Maybe<Scalars["Long"]>;
  type?: Maybe<Scalars["String"]>;
};

export type LectureDto = {
  __typename?: "LectureDto";
  creationDate?: Maybe<Scalars["LocalDateTime"]>;
  description?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["ID"]>;
  modificationDate?: Maybe<Scalars["LocalDateTime"]>;
  speakers?: Maybe<Array<Maybe<UserDto>>>;
  subject?: Maybe<Scalars["String"]>;
};

export type LectureInfoDto = {
  __typename?: "LectureInfoDto";
  content?: Maybe<Scalars["String"]>;
  contentHomeWork?: Maybe<Scalars["String"]>;
  creationDate?: Maybe<Scalars["LocalDateTime"]>;
  description?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["ID"]>;
  modificationDate?: Maybe<Scalars["LocalDateTime"]>;
  speakers?: Maybe<Array<Maybe<UserDto>>>;
  subject?: Maybe<Scalars["String"]>;
};

export type LectureInfoShortDto = {
  __typename?: "LectureInfoShortDto";
  content?: Maybe<Scalars["String"]>;
  creationDate?: Maybe<Scalars["LocalDateTime"]>;
  description?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["ID"]>;
  modificationDate?: Maybe<Scalars["LocalDateTime"]>;
  speakers?: Maybe<Array<Maybe<UserDto>>>;
  subject?: Maybe<Scalars["String"]>;
};

export type LectureInput = {
  content?: InputMaybe<Scalars["String"]>;
  contentHomeWork?: InputMaybe<Scalars["String"]>;
  description?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["ID"]>;
  speakers?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
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
  totalElements?: Maybe<Scalars["Long"]>;
  totalPages?: Maybe<Scalars["Int"]>;
};

/** Mutation root */
export type Mutation = {
  __typename?: "Mutation";
  approved?: Maybe<StudentHomeWorkDto>;
  changePassword?: Maybe<Scalars["Void"]>;
  changePasswordByUserId?: Maybe<Scalars["Void"]>;
  /** user section */
  createUser?: Maybe<UserDto>;
  deleteComment?: Maybe<Scalars["Void"]>;
  deleteHomeWork?: Maybe<Scalars["Void"]>;
  deleteLecture?: Maybe<Scalars["Void"]>;
  deleteTraining?: Maybe<Scalars["Void"]>;
  deleteTrainingTariff?: Maybe<Scalars["Void"]>;
  lockUser?: Maybe<Scalars["Void"]>;
  notApproved?: Maybe<StudentHomeWorkDto>;
  resetState?: Maybe<StudentHomeWorkDto>;
  /** commentHomeWork section */
  sendComment?: Maybe<CommentHomeWorkDto>;
  /** studentHomeWork section */
  sendHomeWorkToCheck?: Maybe<StudentHomeWorkDto>;
  takeForReview?: Maybe<StudentHomeWorkDto>;
  unlockUser?: Maybe<Scalars["Void"]>;
  updateComment?: Maybe<CommentHomeWorkDto>;
  updateHomeWork?: Maybe<StudentHomeWorkDto>;
  /** lecture section */
  updateLecture?: Maybe<LectureInfoDto>;
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
  /** commentHomeWork section */
  commentsHomeWorkByHomeWork?: Maybe<CommentHomeWorksDto>;
  /** studentHomeWork section */
  homeWork?: Maybe<StudentHomeWorkDto>;
  homeWorkByStudentAndLecture?: Maybe<StudentHomeWorkDto>;
  homeWorks?: Maybe<StudentHomeWorksDto>;
  homeWorksByLectureId?: Maybe<StudentHomeWorksDto>;
  homeWorksByStatus?: Maybe<StudentHomeWorksDto>;
  /** lecture section */
  lecture?: Maybe<LectureInfoShortDto>;
  lectureHomeWork?: Maybe<Scalars["String"]>;
  lectures?: Maybe<LecturesDto>;
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
  /** user section */
  user?: Maybe<UserDto>;
  userRoles?: Maybe<Array<Maybe<UserRoleDto>>>;
  users?: Maybe<UsersDto>;
};

/** Query root */
export type QueryCommentsHomeWorkByHomeWorkArgs = {
  homeWorkId: Scalars["ID"];
  page: Scalars["Int"];
  size: Scalars["Int"];
  sort?: InputMaybe<CommentHomeWorkSort>;
};

/** Query root */
export type QueryHomeWorkArgs = {
  id: Scalars["ID"];
};

/** Query root */
export type QueryHomeWorkByStudentAndLectureArgs = {
  lectureId: Scalars["ID"];
  studentId: Scalars["ID"];
};

/** Query root */
export type QueryHomeWorksArgs = {
  page: Scalars["Int"];
  size: Scalars["Int"];
  sort?: InputMaybe<StudentHomeWorkSort>;
};

/** Query root */
export type QueryHomeWorksByLectureIdArgs = {
  lectureId: Scalars["ID"];
  page: Scalars["Int"];
  size: Scalars["Int"];
  sort?: InputMaybe<StudentHomeWorkSort>;
};

/** Query root */
export type QueryHomeWorksByStatusArgs = {
  page: Scalars["Int"];
  size: Scalars["Int"];
  sort?: InputMaybe<StudentHomeWorkSort>;
  status: StudentHomeWorkStatus;
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
export type QueryLecturesArgs = {
  page: Scalars["Int"];
  size: Scalars["Int"];
  sort?: InputMaybe<LectureSort>;
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
  page: Scalars["Int"];
  size: Scalars["Int"];
  sort?: InputMaybe<TrainingTariffSort>;
};

/** Query root */
export type QueryTrainingsArgs = {
  page: Scalars["Int"];
  size: Scalars["Int"];
  sort?: InputMaybe<TrainingSort>;
};

/** Query root */
export type QueryUsersArgs = {
  page: Scalars["Int"];
  size: Scalars["Int"];
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

export type StudentHomeWorkSort = {
  field?: InputMaybe<StudentHomeWorkSortField>;
  order?: InputMaybe<Order>;
};

export enum StudentHomeWorkSortField {
  CreationDate = "CREATION_DATE",
  Mentor = "MENTOR",
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
  totalElements?: Maybe<Scalars["Long"]>;
  totalPages?: Maybe<Scalars["Int"]>;
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
  trainingTariffId?: InputMaybe<Scalars["ID"]>;
  userId?: InputMaybe<Scalars["ID"]>;
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
  trainingId?: InputMaybe<Scalars["ID"]>;
};

export type TrainingTariffSort = {
  field?: InputMaybe<TrainingTariffField>;
  order?: InputMaybe<Order>;
};

export type TrainingTariffsDto = {
  __typename?: "TrainingTariffsDto";
  items?: Maybe<Array<Maybe<TrainingTariffDto>>>;
  totalElements?: Maybe<Scalars["Long"]>;
  totalPages?: Maybe<Scalars["Int"]>;
};

export type TrainingsDto = {
  __typename?: "TrainingsDto";
  items?: Maybe<Array<Maybe<TrainingDto>>>;
  totalElements?: Maybe<Scalars["Long"]>;
  totalPages?: Maybe<Scalars["Int"]>;
};

export type UserCreateInput = {
  email: Scalars["String"];
  firstName: Scalars["String"];
  id?: InputMaybe<Scalars["ID"]>;
  lastName: Scalars["String"];
  middleName?: InputMaybe<Scalars["String"]>;
  password: Scalars["String"];
  phoneNumber: Scalars["String"];
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
  User = "USER",
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
  phoneNumber: Scalars["String"];
};

export type UsersDto = {
  __typename?: "UsersDto";
  items?: Maybe<Array<Maybe<UserDto>>>;
  totalElements?: Maybe<Scalars["Long"]>;
  totalPages?: Maybe<Scalars["Int"]>;
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
    description?: string | null;
    content?: string | null;
    speakers?: Array<{
      __typename?: "UserDto";
      id?: string | null;
      firstName?: string | null;
      lastName?: string | null;
      middleName?: string | null;
    } | null> | null;
  } | null;
};

export type LectureHomeWorkQueryVariables = Exact<{
  lectureId: Scalars["ID"];
}>;

export type LectureHomeWorkQuery = {
  __typename?: "Query";
  lectureHomeWork?: string | null;
};

export type LecturesQueryVariables = Exact<{ [key: string]: never }>;

export type LecturesQuery = {
  __typename?: "Query";
  lectures?: {
    __typename?: "LecturesDto";
    totalPages?: number | null;
    totalElements?: any | null;
    items?: Array<{
      __typename?: "LectureDto";
      id?: string | null;
      description?: string | null;
      speakers?: Array<{
        __typename?: "UserDto";
        id?: string | null;
        firstName?: string | null;
        middleName?: string | null;
        lastName?: string | null;
      } | null> | null;
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
    description?: string | null;
    content?: string | null;
    contentHomeWork?: string | null;
    speakers?: Array<{
      __typename?: "UserDto";
      id?: string | null;
      firstName?: string | null;
      lastName?: string | null;
      middleName?: string | null;
    } | null> | null;
  } | null;
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
      description?: string | null;
    } | null;
    lastLecture?: {
      __typename?: "LectureDto";
      id?: string | null;
      subject?: string | null;
      description?: string | null;
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

export type UpdateRoleMutationVariables = Exact<{
  id: Scalars["ID"];
  roles?: InputMaybe<Array<InputMaybe<UserRole>> | InputMaybe<UserRole>>;
}>;

export type UpdateRoleMutation = {
  __typename?: "Mutation";
  updateRole?: {
    __typename?: "UserDto";
    id?: string | null;
    email?: string | null;
    roles?: Array<UserRole | null> | null;
  } | null;
};

export type UpdateUserMutationVariables = Exact<{
  input: UserUpdateInput;
}>;

export type UpdateUserMutation = {
  __typename?: "Mutation";
  updateUser?: {
    __typename?: "UserDto";
    id?: string | null;
    email?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    middleName?: string | null;
    phoneNumber?: string | null;
    avatarLocation?: string | null;
    locked?: boolean | null;
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

export type UsersQueryVariables = Exact<{ [key: string]: never }>;

export type UsersQuery = {
  __typename?: "Query";
  users?: {
    __typename?: "UsersDto";
    totalPages?: number | null;
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
      description
      content
    }
  }
`;

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
export const LectureHomeWorkDocument = gql`
  query lectureHomeWork($lectureId: ID!) {
    lectureHomeWork(lectureId: $lectureId)
  }
`;

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
export const LecturesDocument = gql`
  query lectures {
    lectures(page: 0, size: 10, sort: { field: SUBJECT }) {
      items {
        id
        speakers {
          id
          firstName
          middleName
          lastName
        }
        description
      }
      totalPages
      totalElements
    }
  }
`;

/**
 * __useLecturesQuery__
 *
 * To run a query within a React component, call `useLecturesQuery` and pass it any options that fit your needs.
 * When your component renders, `useLecturesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLecturesQuery({
 *   variables: {
 *   },
 * });
 */
export function useLecturesQuery(
  baseOptions?: Apollo.QueryHookOptions<LecturesQuery, LecturesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<LecturesQuery, LecturesQueryVariables>(
    LecturesDocument,
    options
  );
}
export function useLecturesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    LecturesQuery,
    LecturesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<LecturesQuery, LecturesQueryVariables>(
    LecturesDocument,
    options
  );
}
export type LecturesQueryHookResult = ReturnType<typeof useLecturesQuery>;
export type LecturesLazyQueryHookResult = ReturnType<
  typeof useLecturesLazyQuery
>;
export type LecturesQueryResult = Apollo.QueryResult<
  LecturesQuery,
  LecturesQueryVariables
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
      subject
      description
      content
      contentHomeWork
    }
  }
`;
export type UpdateLectureMutationFn = Apollo.MutationFunction<
  UpdateLectureMutation,
  UpdateLectureMutationVariables
>;

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
export const UpdateRoleDocument = gql`
  mutation updateRole($id: ID!, $roles: [UserRole]) {
    updateRole(id: $id, roles: $roles) {
      id
      email
      roles
    }
  }
`;
export type UpdateRoleMutationFn = Apollo.MutationFunction<
  UpdateRoleMutation,
  UpdateRoleMutationVariables
>;

/**
 * __useUpdateRoleMutation__
 *
 * To run a mutation, you first call `useUpdateRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRoleMutation, { data, loading, error }] = useUpdateRoleMutation({
 *   variables: {
 *      id: // value for 'id'
 *      roles: // value for 'roles'
 *   },
 * });
 */
export function useUpdateRoleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateRoleMutation,
    UpdateRoleMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateRoleMutation, UpdateRoleMutationVariables>(
    UpdateRoleDocument,
    options
  );
}
export type UpdateRoleMutationHookResult = ReturnType<
  typeof useUpdateRoleMutation
>;
export type UpdateRoleMutationResult =
  Apollo.MutationResult<UpdateRoleMutation>;
export type UpdateRoleMutationOptions = Apollo.BaseMutationOptions<
  UpdateRoleMutation,
  UpdateRoleMutationVariables
>;
export const UpdateUserDocument = gql`
  mutation updateUser($input: UserUpdateInput!) {
    updateUser(input: $input) {
      id
      email
      firstName
      lastName
      middleName
      phoneNumber
      avatarLocation
      locked
      roles
    }
  }
`;
export type UpdateUserMutationFn = Apollo.MutationFunction<
  UpdateUserMutation,
  UpdateUserMutationVariables
>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(
    UpdateUserDocument,
    options
  );
}
export type UpdateUserMutationHookResult = ReturnType<
  typeof useUpdateUserMutation
>;
export type UpdateUserMutationResult =
  Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<
  UpdateUserMutation,
  UpdateUserMutationVariables
>;
export const UserDocument = gql`
  query User {
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
export const UsersDocument = gql`
  query Users {
    users(page: 0, size: 10, sort: { field: EMAIL, order: DESC }) {
      items {
        id
        email
        firstName
        middleName
        lastName
        phoneNumber
        locked
      }
      totalPages
      totalElements
    }
  }
`;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UsersQuery, UsersQueryVariables>(
    UsersDocument,
    options
  );
}
export function useUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(
    UsersDocument,
    options
  );
}
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<
  UsersQuery,
  UsersQueryVariables
>;
