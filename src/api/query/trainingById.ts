import showErrorGraphQL from "../../error/showErrorGraphQL";
import {
  TrainingByIdQuery,
  TrainingByIdQueryVariables,
  useTrainingByIdQuery as _useTrainingByIdQuery,
} from "../../generated/graphql";
import { ApolloError } from "@apollo/client/errors";
import * as Apollo from "@apollo/client";

const options = {
  onError: (error: ApolloError) => showErrorGraphQL(error),
};

export const useTrainingByIdQuery = (
  baseOptions?: Apollo.QueryHookOptions<
    TrainingByIdQuery,
    TrainingByIdQueryVariables
  >
) => {
  return _useTrainingByIdQuery({ ...options, ...baseOptions });
};
