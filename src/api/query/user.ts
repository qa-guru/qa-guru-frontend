import {
  UserQuery,
  UserQueryVariables,
  useUserQuery as _useUserQuery,
} from "../../generated/graphql";
import * as Apollo from "@apollo/client";
import { ApolloError } from "@apollo/client/errors";
import { useSnackbar } from "notistack";

export const useUserQuery = (
  baseOptions?: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>
) => {
  const { enqueueSnackbar } = useSnackbar();

  return _useUserQuery({
    onError: (error: ApolloError) =>
      error.graphQLErrors.map(({ message }) => enqueueSnackbar(message)),
    ...baseOptions,
  });
};
