import * as Apollo from "@apollo/client";
import { ApolloError } from "@apollo/client/errors";
import { useSnackbar } from "notistack";
import {
  MentorsQuery,
  MentorsQueryVariables,
  useMentorsQuery as _useMentorsQuery,
} from "../generated/graphql";

export const useMentorsQuery = (
  baseOptions?: Apollo.QueryHookOptions<MentorsQuery, MentorsQueryVariables>
) => {
  const { enqueueSnackbar } = useSnackbar();

  return _useMentorsQuery({
    onError: (error: ApolloError) =>
      error.graphQLErrors.map(({ message }) => enqueueSnackbar(message)),
    ...baseOptions,
  });
};
