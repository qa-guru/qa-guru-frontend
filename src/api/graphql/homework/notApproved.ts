import { ApolloError } from "@apollo/client/errors";
import { useSnackbar } from "notistack";
import * as Apollo from "@apollo/client";
import {
  NotApprovedMutation,
  NotApprovedMutationVariables,
  useNotApprovedMutation as _useNotApprovedMutation,
} from "../generated/graphql";

export const useNotApprovedMutation = (
  baseOptions?: Apollo.MutationHookOptions<
    NotApprovedMutation,
    NotApprovedMutationVariables
  >
) => {
  const { enqueueSnackbar } = useSnackbar();

  return _useNotApprovedMutation({
    onError: (error: ApolloError) =>
      error.graphQLErrors.map(({ message }) => enqueueSnackbar(message)),
    ...baseOptions,
  });
};
