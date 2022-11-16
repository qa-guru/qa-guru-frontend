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

export type ContentFileDto = {
  __typename?: "ContentFileDto";
  fileLocation?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  size?: Maybe<Scalars["Long"]>;
  type?: Maybe<Scalars["String"]>;
};

export type HomeWorkSort = {
  field?: InputMaybe<HomeWorkSortField>;
  order?: InputMaybe<Order>;
};

export enum HomeWorkSortField {
  CreationDate = "CREATION_DATE",
  Subject = "SUBJECT",
}

export type LectureDto = {
  __typename?: "LectureDto";
  creationDate?: Maybe<Scalars["LocalDateTime"]>;
  description?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["ID"]>;
  modificationDate?: Maybe<Scalars["LocalDateTime"]>;
  speakers?: Maybe<Array<Maybe<UserInfoDto>>>;
  subject?: Maybe<Scalars["String"]>;
};

export type LectureHomeWorkDto = {
  __typename?: "LectureHomeWorkDto";
  creationDate?: Maybe<Scalars["LocalDateTime"]>;
  description?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["ID"]>;
  modificationDate?: Maybe<Scalars["LocalDateTime"]>;
  subject?: Maybe<Scalars["String"]>;
};

export type LectureHomeWorkInfoDto = {
  __typename?: "LectureHomeWorkInfoDto";
  content?: Maybe<Scalars["String"]>;
  creationDate?: Maybe<Scalars["LocalDateTime"]>;
  description?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["ID"]>;
  modificationDate?: Maybe<Scalars["LocalDateTime"]>;
  subject?: Maybe<Scalars["String"]>;
};

export type LectureHomeWorkInput = {
  content?: InputMaybe<Scalars["String"]>;
  description?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["ID"]>;
  subject?: InputMaybe<Scalars["String"]>;
};

export type LectureHomeWorksDto = {
  __typename?: "LectureHomeWorksDto";
  items?: Maybe<Array<Maybe<LectureHomeWorkDto>>>;
  totalElements?: Maybe<Scalars["Long"]>;
  totalPages?: Maybe<Scalars["Int"]>;
};

export type LectureInfoDto = {
  __typename?: "LectureInfoDto";
  content?: Maybe<Scalars["String"]>;
  creationDate?: Maybe<Scalars["LocalDateTime"]>;
  description?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["ID"]>;
  lectureHomeWorks?: Maybe<Array<Maybe<LectureHomeWorkDto>>>;
  modificationDate?: Maybe<Scalars["LocalDateTime"]>;
  speakers?: Maybe<Array<Maybe<UserInfoDto>>>;
  subject?: Maybe<Scalars["String"]>;
};

export type LectureInput = {
  content?: InputMaybe<Scalars["String"]>;
  description?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["ID"]>;
  lectureHomeWorks?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
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
  totalElements?: Maybe<Scalars["Long"]>;
  totalPages?: Maybe<Scalars["Int"]>;
};

/** Mutation root */
export type Mutation = {
  __typename?: "Mutation";
  approved?: Maybe<StudentHomeWorkDto>;
  /** user section */
  createUser?: Maybe<UserDto>;
  deleteLecture?: Maybe<Scalars["Void"]>;
  deleteLectureHomeWork?: Maybe<Scalars["Void"]>;
  deleteTraining?: Maybe<Scalars["Void"]>;
  deleteTrainingTariff?: Maybe<Scalars["Void"]>;
  deleteUser?: Maybe<Scalars["Void"]>;
  notApproved?: Maybe<StudentHomeWorkDto>;
  /** studentHomeWork section */
  takeForReview?: Maybe<StudentHomeWorkDto>;
  /** lecture section */
  updateLecture?: Maybe<LectureInfoDto>;
  /** lectureHomeWork section */
  updateLectureHomeWork?: Maybe<LectureHomeWorkInfoDto>;
  /** person section */
  updatePerson?: Maybe<PersonDto>;
  updateRole?: Maybe<UserDto>;
  /** training section */
  updateTraining?: Maybe<TrainingDto>;
  /** training lecture */
  updateTrainingLecture?: Maybe<Array<Maybe<TrainingLectureDto>>>;
  /** training purchase section */
  updateTrainingPurchase?: Maybe<TrainingPurchaseDto>;
  /** training tariff */
  updateTrainingTariff?: Maybe<TrainingTariffDto>;
};

/** Mutation root */
export type MutationApprovedArgs = {
  homeWorkId: Scalars["ID"];
  resolution?: InputMaybe<Scalars["String"]>;
};

/** Mutation root */
export type MutationCreateUserArgs = {
  password: Scalars["String"];
  username: Scalars["String"];
};

/** Mutation root */
export type MutationDeleteLectureArgs = {
  id: Scalars["ID"];
};

/** Mutation root */
export type MutationDeleteLectureHomeWorkArgs = {
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
export type MutationDeleteUserArgs = {
  id: Scalars["ID"];
};

/** Mutation root */
export type MutationNotApprovedArgs = {
  homeWorkId: Scalars["ID"];
  resolution?: InputMaybe<Scalars["String"]>;
};

/** Mutation root */
export type MutationTakeForReviewArgs = {
  homeWorkId: Scalars["ID"];
};

/** Mutation root */
export type MutationUpdateLectureArgs = {
  input: LectureInput;
};

/** Mutation root */
export type MutationUpdateLectureHomeWorkArgs = {
  input: LectureHomeWorkInput;
};

/** Mutation root */
export type MutationUpdatePersonArgs = {
  input: PersonInput;
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

export enum Order {
  Asc = "ASC",
  Desc = "DESC",
}

export type PersonDto = {
  __typename?: "PersonDto";
  avatarLocation?: Maybe<Scalars["String"]>;
  firstName?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["ID"]>;
  lastName?: Maybe<Scalars["String"]>;
  middleName?: Maybe<Scalars["String"]>;
  phoneNumber?: Maybe<Scalars["String"]>;
};

export type PersonInput = {
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  middleName?: InputMaybe<Scalars["String"]>;
  phoneNumber: Scalars["String"];
};

/** Query root */
export type Query = {
  __typename?: "Query";
  /** lecture section */
  lecture?: Maybe<LectureInfoDto>;
  /** lectureHomeWork section */
  lectureHomeWork?: Maybe<LectureHomeWorkInfoDto>;
  lectureHomeWorks?: Maybe<LectureHomeWorksDto>;
  lectureHomeWorksByLectureId?: Maybe<Array<Maybe<LectureHomeWorkDto>>>;
  lectures?: Maybe<LecturesDto>;
  /** person section */
  person?: Maybe<PersonDto>;
  personByUserId?: Maybe<PersonDto>;
  /** studentHomeWork section */
  studentHomeWork?: Maybe<StudentHomeWorkDto>;
  studentHomeWorks?: Maybe<StudentHomeWorksDto>;
  studentHomeWorksByLectureHomeWorkId?: Maybe<StudentHomeWorksDto>;
  studentHomeWorksByStatus?: Maybe<StudentHomeWorksDto>;
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
export type QueryLectureArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

/** Query root */
export type QueryLectureHomeWorkArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

/** Query root */
export type QueryLectureHomeWorksArgs = {
  page: Scalars["Int"];
  size: Scalars["Int"];
  sort?: InputMaybe<HomeWorkSort>;
};

/** Query root */
export type QueryLectureHomeWorksByLectureIdArgs = {
  lectureId?: InputMaybe<Scalars["ID"]>;
};

/** Query root */
export type QueryLecturesArgs = {
  page: Scalars["Int"];
  size: Scalars["Int"];
  sort?: InputMaybe<LectureSort>;
};

/** Query root */
export type QueryPersonByUserIdArgs = {
  id: Scalars["ID"];
};

/** Query root */
export type QueryStudentHomeWorkArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

/** Query root */
export type QueryStudentHomeWorksArgs = {
  page: Scalars["Int"];
  size: Scalars["Int"];
  sort?: InputMaybe<StudentHomeWorkSort>;
};

/** Query root */
export type QueryStudentHomeWorksByLectureHomeWorkIdArgs = {
  homeWorkId?: InputMaybe<Scalars["ID"]>;
  page: Scalars["Int"];
  size: Scalars["Int"];
  sort?: InputMaybe<StudentHomeWorkSort>;
};

/** Query root */
export type QueryStudentHomeWorksByStatusArgs = {
  page: Scalars["Int"];
  size: Scalars["Int"];
  sort?: InputMaybe<StudentHomeWorkSort>;
  status?: InputMaybe<StudentHomeWorkStatus>;
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
  lectureHomeWork?: Maybe<LectureHomeWorkDto>;
  mentor?: Maybe<UserInfoDto>;
  modificationDate?: Maybe<Scalars["LocalDateTime"]>;
  resolution?: Maybe<Scalars["String"]>;
  startCheckingDate?: Maybe<Scalars["LocalDateTime"]>;
  status?: Maybe<StudentHomeWorkStatus>;
  student?: Maybe<UserInfoDto>;
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
  name: Scalars["String"];
  techStack: TechStack;
};

export type TrainingInput = {
  content?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["ID"]>;
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
  training: TrainingDto;
  trainingTariff: TrainingTariffDto;
  user: UserInfoDto;
};

export type TrainingPurchaseInput = {
  id?: InputMaybe<Scalars["ID"]>;
  trainingId?: InputMaybe<Scalars["ID"]>;
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
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
};

export enum TrainingTariffField {
  Code = "CODE",
  CreationDate = "CREATION_DATE",
  Name = "NAME",
}

export type TrainingTariffInput = {
  code?: InputMaybe<Scalars["String"]>;
  description?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
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

export type UserDto = {
  __typename?: "UserDto";
  email?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["ID"]>;
  roles?: Maybe<Array<Maybe<UserRole>>>;
};

export type UserIdInput = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type UserInfoDto = {
  __typename?: "UserInfoDto";
  email?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["ID"]>;
  person?: Maybe<PersonDto>;
  roles?: Maybe<Array<Maybe<UserRole>>>;
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

export type UsersDto = {
  __typename?: "UsersDto";
  items?: Maybe<Array<Maybe<UserInfoDto>>>;
  totalElements?: Maybe<Scalars["Long"]>;
  totalPages?: Maybe<Scalars["Int"]>;
};

export type LectureHomeWorkByIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars["ID"]>;
}>;

export type LectureHomeWorkByIdQuery = {
  __typename?: "Query";
  lectureHomeWork?: {
    __typename?: "LectureHomeWorkInfoDto";
    id?: string | null;
    subject?: string | null;
    description?: string | null;
  } | null;
};

export type UpdateLectureHomeWorkMutationVariables = Exact<{
  input: LectureHomeWorkInput;
}>;

export type UpdateLectureHomeWorkMutation = {
  __typename?: "Mutation";
  updateLectureHomeWork?: {
    __typename?: "LectureHomeWorkInfoDto";
    id?: string | null;
    subject?: string | null;
    description?: string | null;
  } | null;
};

export type LectureByIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars["ID"]>;
}>;

export type LectureByIdQuery = {
  __typename?: "Query";
  lecture?: {
    __typename?: "LectureInfoDto";
    id?: string | null;
    subject?: string | null;
    description?: string | null;
    speakers?: Array<{
      __typename?: "UserInfoDto";
      id?: string | null;
      email?: string | null;
      roles?: Array<UserRole | null> | null;
      person?: {
        __typename?: "PersonDto";
        firstName?: string | null;
        lastName?: string | null;
        middleName?: string | null;
        phoneNumber?: string | null;
        avatarLocation?: string | null;
      } | null;
    } | null> | null;
    lectureHomeWorks?: Array<{
      __typename?: "LectureHomeWorkDto";
      id?: string | null;
      subject?: string | null;
      description?: string | null;
    } | null> | null;
  } | null;
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
      subject?: string | null;
      description?: string | null;
      speakers?: Array<{
        __typename?: "UserInfoDto";
        id?: string | null;
        email?: string | null;
        roles?: Array<UserRole | null> | null;
        person?: {
          __typename?: "PersonDto";
          firstName?: string | null;
          lastName?: string | null;
          middleName?: string | null;
          phoneNumber?: string | null;
          avatarLocation?: string | null;
        } | null;
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
    speakers?: Array<{
      __typename?: "UserInfoDto";
      id?: string | null;
      email?: string | null;
      roles?: Array<UserRole | null> | null;
      person?: {
        __typename?: "PersonDto";
        firstName?: string | null;
        lastName?: string | null;
        middleName?: string | null;
        phoneNumber?: string | null;
        avatarLocation?: string | null;
      } | null;
    } | null> | null;
    lectureHomeWorks?: Array<{
      __typename?: "LectureHomeWorkDto";
      id?: string | null;
      subject?: string | null;
      description?: string | null;
    } | null> | null;
  } | null;
};

export type TrainingByIdQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type TrainingByIdQuery = {
  __typename?: "Query";
  training?: {
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
    number?: number | null;
    lecture?: {
      __typename?: "LectureDto";
      id?: string | null;
      subject?: string | null;
      description?: string | null;
      speakers?: Array<{
        __typename?: "UserInfoDto";
        person?: {
          __typename?: "PersonDto";
          firstName?: string | null;
          lastName?: string | null;
          middleName?: string | null;
          avatarLocation?: string | null;
        } | null;
      } | null> | null;
    } | null;
  } | null> | null;
};

export type TrainingPurchasesByUserIdQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type TrainingPurchasesByUserIdQuery = {
  __typename?: "Query";
  trainingPurchasesByUserId?: Array<{
    __typename?: "TrainingPurchaseDto";
    training: {
      __typename?: "TrainingDto";
      id: string;
      name: string;
      techStack: TechStack;
    };
  } | null> | null;
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
  username: Scalars["String"];
  password: Scalars["String"];
}>;

export type CreateUserMutation = {
  __typename?: "Mutation";
  createUser?: {
    __typename?: "UserDto";
    id?: string | null;
    email?: string | null;
    roles?: Array<UserRole | null> | null;
  } | null;
};

export type DeleteUserMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type DeleteUserMutation = {
  __typename?: "Mutation";
  deleteUser?: any | null;
};

export type PersonQueryVariables = Exact<{ [key: string]: never }>;

export type PersonQuery = {
  __typename?: "Query";
  person?: {
    __typename?: "PersonDto";
    id?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    middleName?: string | null;
    phoneNumber?: string | null;
    avatarLocation?: string | null;
  } | null;
};

export type UpdatePersonMutationVariables = Exact<{
  input: PersonInput;
}>;

export type UpdatePersonMutation = {
  __typename?: "Mutation";
  updatePerson?: {
    __typename?: "PersonDto";
    id?: string | null;
    phoneNumber?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    middleName?: string | null;
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

export type UserQueryVariables = Exact<{ [key: string]: never }>;

export type UserQuery = {
  __typename?: "Query";
  user?: {
    __typename?: "UserDto";
    id?: string | null;
    email?: string | null;
    roles?: Array<UserRole | null> | null;
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
      __typename?: "UserInfoDto";
      id?: string | null;
      email?: string | null;
      roles?: Array<UserRole | null> | null;
      person?: {
        __typename?: "PersonDto";
        id?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        middleName?: string | null;
        phoneNumber?: string | null;
        avatarLocation?: string | null;
      } | null;
    } | null> | null;
  } | null;
};

export const LectureHomeWorkByIdDocument = gql`
  query LectureHomeWorkById($id: ID) {
    lectureHomeWork(id: $id) {
      id
      subject
      description
    }
  }
`;

/**
 * __useLectureHomeWorkByIdQuery__
 *
 * To run a query within a React component, call `useLectureHomeWorkByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useLectureHomeWorkByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLectureHomeWorkByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLectureHomeWorkByIdQuery(
  baseOptions?: Apollo.QueryHookOptions<
    LectureHomeWorkByIdQuery,
    LectureHomeWorkByIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    LectureHomeWorkByIdQuery,
    LectureHomeWorkByIdQueryVariables
  >(LectureHomeWorkByIdDocument, options);
}
export function useLectureHomeWorkByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    LectureHomeWorkByIdQuery,
    LectureHomeWorkByIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    LectureHomeWorkByIdQuery,
    LectureHomeWorkByIdQueryVariables
  >(LectureHomeWorkByIdDocument, options);
}
export type LectureHomeWorkByIdQueryHookResult = ReturnType<
  typeof useLectureHomeWorkByIdQuery
>;
export type LectureHomeWorkByIdLazyQueryHookResult = ReturnType<
  typeof useLectureHomeWorkByIdLazyQuery
>;
export type LectureHomeWorkByIdQueryResult = Apollo.QueryResult<
  LectureHomeWorkByIdQuery,
  LectureHomeWorkByIdQueryVariables
>;
export const UpdateLectureHomeWorkDocument = gql`
  mutation updateLectureHomeWork($input: LectureHomeWorkInput!) {
    updateLectureHomeWork(input: $input) {
      id
      subject
      description
    }
  }
`;
export type UpdateLectureHomeWorkMutationFn = Apollo.MutationFunction<
  UpdateLectureHomeWorkMutation,
  UpdateLectureHomeWorkMutationVariables
>;

/**
 * __useUpdateLectureHomeWorkMutation__
 *
 * To run a mutation, you first call `useUpdateLectureHomeWorkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLectureHomeWorkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLectureHomeWorkMutation, { data, loading, error }] = useUpdateLectureHomeWorkMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateLectureHomeWorkMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateLectureHomeWorkMutation,
    UpdateLectureHomeWorkMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateLectureHomeWorkMutation,
    UpdateLectureHomeWorkMutationVariables
  >(UpdateLectureHomeWorkDocument, options);
}
export type UpdateLectureHomeWorkMutationHookResult = ReturnType<
  typeof useUpdateLectureHomeWorkMutation
>;
export type UpdateLectureHomeWorkMutationResult =
  Apollo.MutationResult<UpdateLectureHomeWorkMutation>;
export type UpdateLectureHomeWorkMutationOptions = Apollo.BaseMutationOptions<
  UpdateLectureHomeWorkMutation,
  UpdateLectureHomeWorkMutationVariables
>;
export const LectureByIdDocument = gql`
  query LectureById($id: ID) {
    lecture(id: $id) {
      id
      subject
      description
      speakers {
        id
        email
        roles
        person {
          firstName
          lastName
          middleName
          phoneNumber
          avatarLocation
        }
      }
      lectureHomeWorks {
        id
        subject
        description
      }
    }
  }
`;

/**
 * __useLectureByIdQuery__
 *
 * To run a query within a React component, call `useLectureByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useLectureByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLectureByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLectureByIdQuery(
  baseOptions?: Apollo.QueryHookOptions<
    LectureByIdQuery,
    LectureByIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<LectureByIdQuery, LectureByIdQueryVariables>(
    LectureByIdDocument,
    options
  );
}
export function useLectureByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    LectureByIdQuery,
    LectureByIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<LectureByIdQuery, LectureByIdQueryVariables>(
    LectureByIdDocument,
    options
  );
}
export type LectureByIdQueryHookResult = ReturnType<typeof useLectureByIdQuery>;
export type LectureByIdLazyQueryHookResult = ReturnType<
  typeof useLectureByIdLazyQuery
>;
export type LectureByIdQueryResult = Apollo.QueryResult<
  LectureByIdQuery,
  LectureByIdQueryVariables
>;
export const LecturesDocument = gql`
  query Lectures {
    lectures(page: 0, size: 10, sort: { field: SUBJECT }) {
      items {
        id
        subject
        description
        speakers {
          id
          email
          roles
          person {
            firstName
            lastName
            middleName
            phoneNumber
            avatarLocation
          }
        }
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
      subject
      description
      speakers {
        id
        email
        roles
        person {
          firstName
          lastName
          middleName
          phoneNumber
          avatarLocation
        }
      }
      lectureHomeWorks {
        id
        subject
        description
      }
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
export const TrainingByIdDocument = gql`
  query TrainingById($id: ID!) {
    training(id: $id) {
      id
      name
      techStack
    }
  }
`;

/**
 * __useTrainingByIdQuery__
 *
 * To run a query within a React component, call `useTrainingByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useTrainingByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTrainingByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTrainingByIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    TrainingByIdQuery,
    TrainingByIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<TrainingByIdQuery, TrainingByIdQueryVariables>(
    TrainingByIdDocument,
    options
  );
}
export function useTrainingByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    TrainingByIdQuery,
    TrainingByIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<TrainingByIdQuery, TrainingByIdQueryVariables>(
    TrainingByIdDocument,
    options
  );
}
export type TrainingByIdQueryHookResult = ReturnType<
  typeof useTrainingByIdQuery
>;
export type TrainingByIdLazyQueryHookResult = ReturnType<
  typeof useTrainingByIdLazyQuery
>;
export type TrainingByIdQueryResult = Apollo.QueryResult<
  TrainingByIdQuery,
  TrainingByIdQueryVariables
>;
export const TrainingLecturesDocument = gql`
  query TrainingLectures($id: ID!) {
    trainingLectures(id: $id) {
      number
      lecture {
        id
        subject
        description
        speakers {
          person {
            firstName
            lastName
            middleName
            avatarLocation
          }
        }
      }
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
export const TrainingPurchasesByUserIdDocument = gql`
  query TrainingPurchasesByUserId($id: ID!) {
    trainingPurchasesByUserId(userId: $id) {
      training {
        id
        name
        techStack
      }
    }
  }
`;

/**
 * __useTrainingPurchasesByUserIdQuery__
 *
 * To run a query within a React component, call `useTrainingPurchasesByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useTrainingPurchasesByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTrainingPurchasesByUserIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTrainingPurchasesByUserIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    TrainingPurchasesByUserIdQuery,
    TrainingPurchasesByUserIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    TrainingPurchasesByUserIdQuery,
    TrainingPurchasesByUserIdQueryVariables
  >(TrainingPurchasesByUserIdDocument, options);
}
export function useTrainingPurchasesByUserIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    TrainingPurchasesByUserIdQuery,
    TrainingPurchasesByUserIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    TrainingPurchasesByUserIdQuery,
    TrainingPurchasesByUserIdQueryVariables
  >(TrainingPurchasesByUserIdDocument, options);
}
export type TrainingPurchasesByUserIdQueryHookResult = ReturnType<
  typeof useTrainingPurchasesByUserIdQuery
>;
export type TrainingPurchasesByUserIdLazyQueryHookResult = ReturnType<
  typeof useTrainingPurchasesByUserIdLazyQuery
>;
export type TrainingPurchasesByUserIdQueryResult = Apollo.QueryResult<
  TrainingPurchasesByUserIdQuery,
  TrainingPurchasesByUserIdQueryVariables
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
export const CreateUserDocument = gql`
  mutation CreateUser($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
      id
      email
      roles
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
 *      username: // value for 'username'
 *      password: // value for 'password'
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
export const DeleteUserDocument = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;
export type DeleteUserMutationFn = Apollo.MutationFunction<
  DeleteUserMutation,
  DeleteUserMutationVariables
>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteUserMutation,
    DeleteUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(
    DeleteUserDocument,
    options
  );
}
export type DeleteUserMutationHookResult = ReturnType<
  typeof useDeleteUserMutation
>;
export type DeleteUserMutationResult =
  Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<
  DeleteUserMutation,
  DeleteUserMutationVariables
>;
export const PersonDocument = gql`
  query Person {
    person {
      id
      firstName
      lastName
      middleName
      phoneNumber
      avatarLocation
    }
  }
`;

/**
 * __usePersonQuery__
 *
 * To run a query within a React component, call `usePersonQuery` and pass it any options that fit your needs.
 * When your component renders, `usePersonQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePersonQuery({
 *   variables: {
 *   },
 * });
 */
export function usePersonQuery(
  baseOptions?: Apollo.QueryHookOptions<PersonQuery, PersonQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PersonQuery, PersonQueryVariables>(
    PersonDocument,
    options
  );
}
export function usePersonLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PersonQuery, PersonQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PersonQuery, PersonQueryVariables>(
    PersonDocument,
    options
  );
}
export type PersonQueryHookResult = ReturnType<typeof usePersonQuery>;
export type PersonLazyQueryHookResult = ReturnType<typeof usePersonLazyQuery>;
export type PersonQueryResult = Apollo.QueryResult<
  PersonQuery,
  PersonQueryVariables
>;
export const UpdatePersonDocument = gql`
  mutation updatePerson($input: PersonInput!) {
    updatePerson(input: $input) {
      id
      phoneNumber
      firstName
      lastName
      middleName
    }
  }
`;
export type UpdatePersonMutationFn = Apollo.MutationFunction<
  UpdatePersonMutation,
  UpdatePersonMutationVariables
>;

/**
 * __useUpdatePersonMutation__
 *
 * To run a mutation, you first call `useUpdatePersonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePersonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePersonMutation, { data, loading, error }] = useUpdatePersonMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePersonMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdatePersonMutation,
    UpdatePersonMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdatePersonMutation,
    UpdatePersonMutationVariables
  >(UpdatePersonDocument, options);
}
export type UpdatePersonMutationHookResult = ReturnType<
  typeof useUpdatePersonMutation
>;
export type UpdatePersonMutationResult =
  Apollo.MutationResult<UpdatePersonMutation>;
export type UpdatePersonMutationOptions = Apollo.BaseMutationOptions<
  UpdatePersonMutation,
  UpdatePersonMutationVariables
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
export const UserDocument = gql`
  query User {
    user {
      id
      email
      roles
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
    users(page: 0, size: 100, sort: { field: EMAIL, order: DESC }) {
      items {
        id
        email
        roles
        person {
          id
          firstName
          lastName
          middleName
          phoneNumber
          avatarLocation
        }
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
