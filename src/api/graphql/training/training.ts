import { ApolloError } from "@apollo/client/errors";
import { useSnackbar } from "notistack";
import * as Apollo from "@apollo/client";
import {
  TrainingQuery,
  TrainingQueryVariables,
  useTrainingQuery as _useTrainingQuery,
} from "../generated/graphql";

export const useTrainingQuery = (
  baseOptions?: Apollo.QueryHookOptions<TrainingQuery, TrainingQueryVariables>
) => {
  const { enqueueSnackbar } = useSnackbar();

  return _useTrainingQuery({
    onError: (error: ApolloError) =>
      error.graphQLErrors.map(({ message }) => enqueueSnackbar(message)),
    ...baseOptions,
  });
};
