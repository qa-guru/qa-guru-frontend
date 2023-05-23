import { ApolloError } from "@apollo/client/errors";
import { useSnackbar } from "notistack";
import * as Apollo from "@apollo/client";
import {
  TrainingsQuery,
  TrainingsQueryVariables,
  useTrainingsQuery as _useTrainingsQuery,
} from "../generated/graphql";

export const useTrainingsQuery = (
  baseOptions?: Apollo.QueryHookOptions<TrainingsQuery, TrainingsQueryVariables>
) => {
  const { enqueueSnackbar } = useSnackbar();

  return _useTrainingsQuery({
    onError: (error: ApolloError) =>
      error.graphQLErrors.map(({ message }) => enqueueSnackbar(message)),
    ...baseOptions,
  });
};
