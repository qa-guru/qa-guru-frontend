import { ApolloError } from "@apollo/client/errors";
import { useSnackbar } from "notistack";
import * as Apollo from "@apollo/client";
import {
  ApprovedMutation,
  ApprovedMutationVariables,
  useApprovedMutation as _useApprovedMutation,
} from "../generated/graphql";

export const useApprovedMutation = (
  baseOptions?: Apollo.MutationHookOptions<
    ApprovedMutation,
    ApprovedMutationVariables
  >
) => {
  const { enqueueSnackbar } = useSnackbar();

  return _useApprovedMutation({
    onError: (error: ApolloError) =>
      error.graphQLErrors.map(({ message }) => enqueueSnackbar(message)),
    ...baseOptions,
  });
};
