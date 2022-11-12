import {
  TrainingPurchasesByUserIdQuery,
  TrainingPurchasesByUserIdQueryVariables,
  useTrainingPurchasesByUserIdQuery as _useTrainingPurchasesByUserIdQuery,
} from "../../../generated/graphql";
import { ApolloError } from "@apollo/client/errors";
import * as Apollo from "@apollo/client";
import { useSnackbar } from "notistack";

export const useTrainingPurchasesByUserIdQuery = (
  baseOptions?: Apollo.QueryHookOptions<
    TrainingPurchasesByUserIdQuery,
    TrainingPurchasesByUserIdQueryVariables
  >
) => {
  const { enqueueSnackbar } = useSnackbar();

  return _useTrainingPurchasesByUserIdQuery({
    onError: (error: ApolloError) =>
      error.graphQLErrors.map(({ message }) => enqueueSnackbar(message)),
    ...baseOptions,
  });
};
