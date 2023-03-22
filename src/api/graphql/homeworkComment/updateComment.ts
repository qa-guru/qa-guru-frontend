import { ApolloError } from "@apollo/client/errors";
import { useSnackbar } from "notistack";
import * as Apollo from "@apollo/client";
import {
  UpdateCommentMutation,
  UpdateCommentMutationVariables,
  useUpdateCommentMutation as _useUpdateCommentMutation,
} from "../generated/graphql";

export const useUpdateCommentMutation = (
  baseOptions?: Apollo.MutationHookOptions<
    UpdateCommentMutation,
    UpdateCommentMutationVariables
  >
) => {
  const { enqueueSnackbar } = useSnackbar();

  return _useUpdateCommentMutation({
    onError: (error: ApolloError) =>
      error.graphQLErrors.map(({ message }) => enqueueSnackbar(message)),
    ...baseOptions,
  });
};
