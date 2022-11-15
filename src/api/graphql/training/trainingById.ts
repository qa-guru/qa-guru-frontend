import {
  TrainingByIdQuery,
  TrainingByIdQueryVariables,
  useTrainingByIdQuery as _useTrainingByIdQuery,
} from "../../../generated/graphql";
import { ApolloError } from "@apollo/client/errors";
import * as Apollo from "@apollo/client";
import { useSnackbar } from "notistack";

export const useTrainingByIdQuery = (
  baseOptions?: Apollo.QueryHookOptions<
    TrainingByIdQuery,
    TrainingByIdQueryVariables
  >
) => {
  const { enqueueSnackbar } = useSnackbar();

  return _useTrainingByIdQuery({
    onError: (error: ApolloError) =>
      error.graphQLErrors.map(({ message }) => enqueueSnackbar(message)),
    ...baseOptions,
  });
};
