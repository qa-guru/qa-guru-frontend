import { ApolloError } from "@apollo/client/errors";
import { useSnackbar } from "notistack";
import * as Apollo from "@apollo/client";
import {
  CommentsHomeWorkByHomeWorkQuery,
  CommentsHomeWorkByHomeWorkQueryVariables,
  useCommentsHomeWorkByHomeWorkQuery as _useCommentsHomeWorkByHomeWorkQuery,
} from "../generated/graphql";

export const useCommentsHomeWorkByHomeWorkQuery = (
  baseOptions?: Apollo.QueryHookOptions<
    CommentsHomeWorkByHomeWorkQuery,
    CommentsHomeWorkByHomeWorkQueryVariables
  >
) => {
  const { enqueueSnackbar } = useSnackbar();

  return _useCommentsHomeWorkByHomeWorkQuery({
    onError: (error: ApolloError) =>
      error.graphQLErrors.map(({ message }) => enqueueSnackbar(message)),
    ...baseOptions,
  });
};
