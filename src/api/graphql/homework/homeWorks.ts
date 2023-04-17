import { ApolloError } from "@apollo/client/errors";
import { useSnackbar } from "notistack";
import * as Apollo from "@apollo/client";
import {
  HomeWorksQuery,
  HomeWorksQueryVariables,
  useHomeWorksQuery as _useHomeWorksQuery,
} from "../generated/graphql";

export const useHomeWorksQuery = (
  baseOptions?: Apollo.QueryHookOptions<HomeWorksQuery, HomeWorksQueryVariables>
) => {
  const { enqueueSnackbar } = useSnackbar();

  return _useHomeWorksQuery({
    onError: (error: ApolloError) =>
      error.graphQLErrors.map(({ message }) => enqueueSnackbar(message)),
    ...baseOptions,
  });
};
