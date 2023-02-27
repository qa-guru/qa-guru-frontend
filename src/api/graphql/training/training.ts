import { ApolloError } from "@apollo/client/errors";
import { useSnackbar } from "notistack";
import { useTrainingQuery as _useTrainingQuery } from "../generated/graphql";

export const useTrainingQuery = (baseOptions?: {
  variables: { id: string };
}) => {
  const { enqueueSnackbar } = useSnackbar();

  return _useTrainingQuery({
    onError: (error: ApolloError) =>
      error.graphQLErrors.map(({ message }) => enqueueSnackbar(message)),
    ...baseOptions,
  });
};
