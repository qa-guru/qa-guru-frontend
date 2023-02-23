import {
  TrainingLecturesQuery,
  TrainingLecturesQueryVariables,
  useTrainingLecturesQuery as _useTrainingLecturesQuery,
} from "../../../generated/graphql";
import { ApolloError } from "@apollo/client/errors";
import { useSnackbar } from "notistack";
import * as Apollo from "@apollo/client";

export const useTrainingLecturesQuery = (
  baseOptions?: Apollo.QueryHookOptions<
    TrainingLecturesQuery,
    TrainingLecturesQueryVariables
  >
) => {
  const { enqueueSnackbar } = useSnackbar();

  return _useTrainingLecturesQuery({
    onError: (error: ApolloError) =>
      error.graphQLErrors.map(({ message }) => enqueueSnackbar(message)),
    ...baseOptions,
  });
};
