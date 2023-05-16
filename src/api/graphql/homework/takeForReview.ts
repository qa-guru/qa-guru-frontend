import { ApolloError } from "@apollo/client/errors";
import { useSnackbar } from "notistack";
import * as Apollo from "@apollo/client";
import {
  TakeForReviewMutation,
  TakeForReviewMutationVariables,
  useTakeForReviewMutation as _useTakeForReviewMutation,
} from "../generated/graphql";

export const useTakeForReviewMutation = (
  baseOptions?: Apollo.MutationHookOptions<
    TakeForReviewMutation,
    TakeForReviewMutationVariables
  >
) => {
  const { enqueueSnackbar } = useSnackbar();

  return _useTakeForReviewMutation({
    onError: (error: ApolloError) =>
      error.graphQLErrors.map(({ message }) => enqueueSnackbar(message)),
    ...baseOptions,
  });
};
