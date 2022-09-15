import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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
  __typename?: 'ContentFileDto';
  fileLocation?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['Long']>;
  type?: Maybe<Scalars['String']>;
};

export type HomeWorkDto = {
  __typename?: 'HomeWorkDto';
  contentFiles?: Maybe<Array<Maybe<ContentFileDto>>>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  subject?: Maybe<Scalars['String']>;
};

export type HomeWorkInput = {
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  subject?: InputMaybe<Scalars['String']>;
};

export type HomeWorkSort = {
  field?: InputMaybe<HomeWorkSortField>;
  order?: InputMaybe<Order>;
};

export enum HomeWorkSortField {
  CreationDate = 'CREATION_DATE',
  Subject = 'SUBJECT'
}

export type HomeWorksDto = {
  __typename?: 'HomeWorksDto';
  items?: Maybe<Array<Maybe<HomeWorkDto>>>;
  totalElements?: Maybe<Scalars['Long']>;
  totalPages?: Maybe<Scalars['Int']>;
};

/** Mutation root */
export type Mutation = {
  __typename?: 'Mutation';
  /** purchase section */
  createPurchase?: Maybe<PurchaseDto>;
  /** training section */
  createTraining?: Maybe<TrainingDto>;
  /** user section */
  createUser?: Maybe<UserDto>;
  deleteHomeWork?: Maybe<Scalars['Void']>;
  deleteTask?: Maybe<Scalars['Void']>;
  deleteUser?: Maybe<Scalars['Void']>;
  /** homeWork section */
  updateHomeWork?: Maybe<HomeWorkDto>;
  /** person section */
  updatePerson?: Maybe<PersonDto>;
  updateRole?: Maybe<UserDto>;
  /** task section */
  updateTask?: Maybe<TaskDto>;
};


/** Mutation root */
export type MutationCreatePurchaseArgs = {
  input: PurchaseInput;
};


/** Mutation root */
export type MutationCreateTrainingArgs = {
  input: TrainingInput;
};


/** Mutation root */
export type MutationCreateUserArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


/** Mutation root */
export type MutationDeleteHomeWorkArgs = {
  id: Scalars['ID'];
};


/** Mutation root */
export type MutationDeleteTaskArgs = {
  id: Scalars['ID'];
};


/** Mutation root */
export type MutationDeleteUserArgs = {
  id: Scalars['ID'];
};


/** Mutation root */
export type MutationUpdateHomeWorkArgs = {
  input: HomeWorkInput;
};


/** Mutation root */
export type MutationUpdatePersonArgs = {
  input: PersonInput;
};


/** Mutation root */
export type MutationUpdateRoleArgs = {
  id: Scalars['ID'];
  roles?: InputMaybe<Array<InputMaybe<UserRole>>>;
};


/** Mutation root */
export type MutationUpdateTaskArgs = {
  input: TaskInput;
};

export enum Order {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type PersonDto = {
  __typename?: 'PersonDto';
  avatarLocation?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  lastName?: Maybe<Scalars['String']>;
  middleName?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
};

export type PersonInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  middleName?: InputMaybe<Scalars['String']>;
  phoneNumber: Scalars['String'];
};

export type PurchaseDto = {
  __typename?: 'PurchaseDto';
  id?: Maybe<Scalars['ID']>;
  training: TrainingDto;
  trainingTariff: TrainingTariffDto;
  user: UserDto;
};

export type PurchaseInput = {
  trainingId?: InputMaybe<Scalars['ID']>;
  trainingTariffId?: InputMaybe<Scalars['ID']>;
  userId?: InputMaybe<Scalars['ID']>;
};

/** Query root */
export type Query = {
  __typename?: 'Query';
  /** homeWork section */
  homeWork?: Maybe<HomeWorkDto>;
  homeWorks?: Maybe<HomeWorksDto>;
  /** person section */
  person?: Maybe<PersonDto>;
  personByUserId?: Maybe<PersonDto>;
  /** task section */
  task?: Maybe<TaskDto>;
  taskHomeWorks?: Maybe<Array<Maybe<HomeWorkDto>>>;
  tasks?: Maybe<TasksDto>;
  /** user section */
  user?: Maybe<UserDto>;
  users?: Maybe<UsersDto>;
};


/** Query root */
export type QueryHomeWorkArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


/** Query root */
export type QueryHomeWorksArgs = {
  page: Scalars['Int'];
  size: Scalars['Int'];
  sort?: InputMaybe<HomeWorkSort>;
};


/** Query root */
export type QueryPersonByUserIdArgs = {
  id: Scalars['ID'];
};


/** Query root */
export type QueryTaskArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


/** Query root */
export type QueryTaskHomeWorksArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


/** Query root */
export type QueryTasksArgs = {
  page: Scalars['Int'];
  size: Scalars['Int'];
  sort?: InputMaybe<TaskSort>;
};


/** Query root */
export type QueryUserArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


/** Query root */
export type QueryUsersArgs = {
  page: Scalars['Int'];
  size: Scalars['Int'];
  sort?: InputMaybe<UserSort>;
};

export type TaskDto = {
  __typename?: 'TaskDto';
  contentFiles?: Maybe<Array<Maybe<ContentFileDto>>>;
  description?: Maybe<Scalars['String']>;
  homeWorks?: Maybe<Array<Maybe<HomeWorkDto>>>;
  id?: Maybe<Scalars['ID']>;
  last?: Maybe<Scalars['ID']>;
  locking?: Maybe<Scalars['Boolean']>;
  speakers?: Maybe<Array<Maybe<UserInfoDto>>>;
  subject?: Maybe<Scalars['String']>;
};

export type TaskInput = {
  description?: InputMaybe<Scalars['String']>;
  homeWorks?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  id?: InputMaybe<Scalars['ID']>;
  last?: InputMaybe<Scalars['ID']>;
  locking?: InputMaybe<Scalars['Boolean']>;
  speakers?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  subject?: InputMaybe<Scalars['String']>;
};

export type TaskSort = {
  field?: InputMaybe<TaskSortField>;
  order?: InputMaybe<Order>;
};

export enum TaskSortField {
  CreationDate = 'CREATION_DATE',
  Subject = 'SUBJECT'
}

export type TasksDto = {
  __typename?: 'TasksDto';
  items?: Maybe<Array<Maybe<TaskDto>>>;
  totalElements?: Maybe<Scalars['Long']>;
  totalPages?: Maybe<Scalars['Int']>;
};

export enum TechStack {
  Java = 'JAVA',
  Python = 'PYTHON'
}

export type TrainingDto = {
  __typename?: 'TrainingDto';
  id: Scalars['ID'];
  name: Scalars['String'];
  tariffs?: Maybe<Array<Maybe<TrainingTariffDto>>>;
  techStack: TechStack;
};

export type TrainingInput = {
  name?: InputMaybe<Scalars['String']>;
  tariffs?: InputMaybe<Array<InputMaybe<TrainingTariffInput>>>;
  techStack: TechStack;
};

export type TrainingTariffDto = {
  __typename?: 'TrainingTariffDto';
  code?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type TrainingTariffInput = {
  code?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type UserDto = {
  __typename?: 'UserDto';
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  roles?: Maybe<Array<Maybe<UserRole>>>;
};

export type UserIdInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type UserInfoDto = {
  __typename?: 'UserInfoDto';
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  person?: Maybe<PersonDto>;
  roles?: Maybe<Array<Maybe<UserRole>>>;
};

export enum UserRole {
  Admin = 'ADMIN',
  Lector = 'LECTOR',
  Manager = 'MANAGER',
  Master = 'MASTER',
  Mentor = 'MENTOR',
  User = 'USER'
}

export type UserSort = {
  field?: InputMaybe<UserSortField>;
  order?: InputMaybe<Order>;
};

export enum UserSortField {
  Email = 'EMAIL',
  LastName = 'LAST_NAME',
  Phone = 'PHONE'
}

export type UsersDto = {
  __typename?: 'UsersDto';
  items?: Maybe<Array<Maybe<UserInfoDto>>>;
  totalElements?: Maybe<Scalars['Long']>;
  totalPages?: Maybe<Scalars['Int']>;
};

export type SignUpMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignUpMutation = { __typename?: 'Mutation', createUser?: { __typename?: 'UserDto', id?: string | null, email?: string | null, roles?: Array<UserRole | null> | null } | null };


export const SignUpDocument = gql`
    mutation SignUp($username: String!, $password: String!) {
  createUser(username: $username, password: $password) {
    id
    email
    roles
  }
}
    `;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

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
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;