import { useTrainingLecturesQuery as _useTrainingLecturesQuery } from "../../../generated/graphql";
import { ApolloError } from "@apollo/client/errors";
import { useSnackbar } from "notistack";

export const useTrainingLecturesQuery = (baseOptions?: {
  variables: { id: string };
}) => {
  const { enqueueSnackbar } = useSnackbar();

  return _useTrainingLecturesQuery({
    onError: (error: ApolloError) =>
      error.graphQLErrors.map(({ message }) => enqueueSnackbar(message)),
    ...baseOptions,
  });
};
