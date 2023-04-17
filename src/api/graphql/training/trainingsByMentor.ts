import { ApolloError } from "@apollo/client/errors";
import { useSnackbar } from "notistack";
import * as Apollo from "@apollo/client";
import {
  TrainingsByMentorQuery,
  TrainingsByMentorQueryVariables,
  useTrainingsByMentorQuery as _useTrainingsByMentorQuery,
} from "../generated/graphql";

export const useTrainingsByMentorQuery = (
  baseOptions?: Apollo.QueryHookOptions<
    TrainingsByMentorQuery,
    TrainingsByMentorQueryVariables
  >
) => {
  const { enqueueSnackbar } = useSnackbar();

  return _useTrainingsByMentorQuery({
    onError: (error: ApolloError) =>
      error.graphQLErrors.map(({ message }) => enqueueSnackbar(message)),
    ...baseOptions,
  });
};
