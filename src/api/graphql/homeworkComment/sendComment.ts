import { ApolloError } from "@apollo/client/errors";
import { useSnackbar } from "notistack";
import * as Apollo from "@apollo/client";
import {
  SendCommentMutation,
  SendCommentMutationVariables,
  useSendCommentMutation as _useSendCommentMutation,
} from "../generated/graphql";

export const useSendCommentMutation = (
  baseOptions?: Apollo.MutationHookOptions<
    SendCommentMutation,
    SendCommentMutationVariables
  >
) => {
  const { enqueueSnackbar } = useSnackbar();

  return _useSendCommentMutation({
    onError: (error: ApolloError) =>
      error.graphQLErrors.map(({ message }) => enqueueSnackbar(message)),
    ...baseOptions,
  });
};
