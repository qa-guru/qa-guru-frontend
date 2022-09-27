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
  contentFiles?: Maybe<Array<Maybe<ContentFileDto>>>;
  description?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["ID"]>;
  lectureHomeWorks?: Maybe<Array<Maybe<LectureHomeWorkDto>>>;
  speakers?: Maybe<Array<Maybe<UserInfoDto>>>;
  subject?: Maybe<Scalars["String"]>;
};

export type LectureHomeWorkDto = {
  __typename?: "LectureHomeWorkDto";
  contentFiles?: Maybe<Array<Maybe<ContentFileDto>>>;
  description?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["ID"]>;
  subject?: Maybe<Scalars["String"]>;
};

export type LectureHomeWorkInput = {
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

export type LectureInput = {
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
  /** purchase section */
  createPurchase?: Maybe<PurchaseDto>;
  /** user section */
  createUser?: Maybe<UserDto>;
  deleteLecture?: Maybe<Scalars["Void"]>;
  deleteLectureHomeWork?: Maybe<Scalars["Void"]>;
  deleteTraining?: Maybe<Scalars["Void"]>;
  deleteUser?: Maybe<Scalars["Void"]>;
  removeTrainingLecture?: Maybe<TrainingDto>;
  /** lecture section */
  updateLecture?: Maybe<LectureDto>;
  /** lectureHomeWork section */
  updateLectureHomeWork?: Maybe<LectureHomeWorkDto>;
  /** person section */
  updatePerson?: Maybe<PersonDto>;
  updateRole?: Maybe<UserDto>;
  /** training section */
  updateTraining?: Maybe<TrainingDto>;
  updateTrainingLecture?: Maybe<TrainingDto>;
};

/** Mutation root */
export type MutationCreatePurchaseArgs = {
  input: PurchaseInput;
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
export type MutationDeleteUserArgs = {
  id: Scalars["ID"];
};

/** Mutation root */
export type MutationRemoveTrainingLectureArgs = {
  id: Scalars["ID"];
  trainingId: Scalars["ID"];
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
  input: TrainingLectureInput;
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

export type PurchaseDto = {
  __typename?: "PurchaseDto";
  id?: Maybe<Scalars["ID"]>;
  training: TrainingDto;
  trainingTariff: TrainingTariffDto;
  user: UserDto;
};

export type PurchaseInput = {
  trainingId?: InputMaybe<Scalars["ID"]>;
  trainingTariffId?: InputMaybe<Scalars["ID"]>;
  userId?: InputMaybe<Scalars["ID"]>;
};

/** Query root */
export type Query = {
  __typename?: "Query";
  /** lectureHomeWork section */
  homeWork?: Maybe<LectureHomeWorkDto>;
  homeWorks?: Maybe<LectureHomeWorksDto>;
  /** lecture section */
  lecture?: Maybe<LectureDto>;
  lectureHomeWorks?: Maybe<Array<Maybe<LectureHomeWorkDto>>>;
  lectures?: Maybe<LecturesDto>;
  /** person section */
  person?: Maybe<PersonDto>;
  personByUserId?: Maybe<PersonDto>;
  /** training section */
  training?: Maybe<TrainingDto>;
  trainings?: Maybe<TrainingsDto>;
  /** user section */
  user?: Maybe<UserDto>;
  users?: Maybe<UsersDto>;
};

/** Query root */
export type QueryHomeWorkArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

/** Query root */
export type QueryHomeWorksArgs = {
  page: Scalars["Int"];
  size: Scalars["Int"];
  sort?: InputMaybe<HomeWorkSort>;
};

/** Query root */
export type QueryLectureArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

/** Query root */
export type QueryLectureHomeWorksArgs = {
  id?: InputMaybe<Scalars["ID"]>;
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
export type QueryTrainingArgs = {
  id: Scalars["ID"];
};

/** Query root */
export type QueryTrainingsArgs = {
  page: Scalars["Int"];
  size: Scalars["Int"];
  sort?: InputMaybe<TrainingSort>;
};

/** Query root */
export type QueryUserArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

/** Query root */
export type QueryUsersArgs = {
  page: Scalars["Int"];
  size: Scalars["Int"];
  sort?: InputMaybe<UserSort>;
};

export enum TechStack {
  Java = "JAVA",
  Python = "PYTHON",
}

export type TrainingDto = {
  __typename?: "TrainingDto";
  id: Scalars["ID"];
  lectures?: Maybe<Array<Maybe<TrainingLectureDto>>>;
  name: Scalars["String"];
  techStack: TechStack;
};

export type TrainingInput = {
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
};

export type TrainingLectureInput = {
  lastLecture?: InputMaybe<Scalars["ID"]>;
  lecture: Scalars["ID"];
  locking?: InputMaybe<Scalars["Boolean"]>;
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

export type TrainingTariffInput = {
  code?: InputMaybe<Scalars["String"]>;
  description?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
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

export type PersonByUserIdQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type PersonByUserIdQuery = {
  __typename?: "Query";
  personByUserId?: {
    __typename?: "PersonDto";
    id?: string | null;
    lastName?: string | null;
    firstName?: string | null;
    middleName?: string | null;
    phoneNumber?: string | null;
  } | null;
};

export type SignUpMutationVariables = Exact<{
  username: Scalars["String"];
  password: Scalars["String"];
}>;

export type SignUpMutation = {
  __typename?: "Mutation";
  createUser?: {
    __typename?: "UserDto";
    id?: string | null;
    email?: string | null;
    roles?: Array<UserRole | null> | null;
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
export const PersonByUserIdDocument = gql`
  query PersonByUserId($id: ID!) {
    personByUserId(id: $id) {
      id
      lastName
      firstName
      middleName
      phoneNumber
    }
  }
`;

/**
 * __usePersonByUserIdQuery__
 *
 * To run a query within a React component, call `usePersonByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `usePersonByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePersonByUserIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePersonByUserIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    PersonByUserIdQuery,
    PersonByUserIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PersonByUserIdQuery, PersonByUserIdQueryVariables>(
    PersonByUserIdDocument,
    options
  );
}
export function usePersonByUserIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PersonByUserIdQuery,
    PersonByUserIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PersonByUserIdQuery, PersonByUserIdQueryVariables>(
    PersonByUserIdDocument,
    options
  );
}
export type PersonByUserIdQueryHookResult = ReturnType<
  typeof usePersonByUserIdQuery
>;
export type PersonByUserIdLazyQueryHookResult = ReturnType<
  typeof usePersonByUserIdLazyQuery
>;
export type PersonByUserIdQueryResult = Apollo.QueryResult<
  PersonByUserIdQuery,
  PersonByUserIdQueryVariables
>;
export const SignUpDocument = gql`
  mutation SignUp($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
      id
      email
      roles
    }
  }
`;
export type SignUpMutationFn = Apollo.MutationFunction<
  SignUpMutation,
  SignUpMutationVariables
>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignUpMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SignUpMutation,
    SignUpMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(
    SignUpDocument,
    options
  );
}
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<
  SignUpMutation,
  SignUpMutationVariables
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
