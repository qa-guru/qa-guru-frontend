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
  description?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["ID"]>;
  lectureHomeWorks?: Maybe<Array<Maybe<LectureHomeWorkDto>>>;
  speakers?: Maybe<Array<Maybe<UserInfoDto>>>;
  subject?: Maybe<Scalars["String"]>;
};

export type LectureHomeWorkDto = {
  __typename?: "LectureHomeWorkDto";
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
  /** lecture section */
  lecture?: Maybe<LectureDto>;
  /** lectureHomeWork section */
  lectureHomeWork?: Maybe<LectureHomeWorkDto>;
  lectureHomeWorks?: Maybe<LectureHomeWorksDto>;
  lectureHomeWorksByLecture?: Maybe<Array<Maybe<LectureHomeWorkDto>>>;
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
export type QueryLectureHomeWorksByLectureArgs = {
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

export type UpdateLectureMutationVariables = Exact<{
  input: LectureInput;
}>;

export type UpdateLectureMutation = {
  __typename?: "Mutation";
  updateLecture?: {
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
    lectureHomeWorks?: Array<{
      __typename?: "LectureHomeWorkDto";
      id?: string | null;
      subject?: string | null;
      description?: string | null;
    } | null> | null;
  } | null;
};

export type UpdateLectureHomeWorkMutationVariables = Exact<{
  input: LectureHomeWorkInput;
}>;

export type UpdateLectureHomeWorkMutation = {
  __typename?: "Mutation";
  updateLectureHomeWork?: {
    __typename?: "LectureHomeWorkDto";
    id?: string | null;
    subject?: string | null;
    description?: string | null;
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
