import showErrorGraphQL from "../../error/showErrorGraphQL";
import {
  PersonQuery,
  PersonQueryVariables,
  usePersonQuery as _usePersonQuery,
} from "../../generated/graphql";
import * as Apollo from "@apollo/client";
import { ApolloError } from "@apollo/client/errors";

const options = { onError: (error: ApolloError) => showErrorGraphQL(error) };

export const usePersonQuery = (
  baseOptions?: Apollo.QueryHookOptions<PersonQuery, PersonQueryVariables>
) => {
  return _usePersonQuery({ ...options, ...baseOptions });
};
