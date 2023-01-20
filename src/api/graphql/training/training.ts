import { useTrainingQuery as _useTrainingQuery } from "../../../generated/graphql";
import { ApolloError } from "@apollo/client/errors";
import { useSnackbar } from "notistack";

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
