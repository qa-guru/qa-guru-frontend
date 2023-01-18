import { useTrainingPurchasesQuery as _useTrainingPurchasesQuery } from "../../../generated/graphql";
import { ApolloError } from "@apollo/client/errors";
import { useSnackbar } from "notistack";

export const useTrainingPurchasesQuery = () => {
  const { enqueueSnackbar } = useSnackbar();

  return _useTrainingPurchasesQuery({
    onError: (error: ApolloError) =>
      error.graphQLErrors.map(({ message }) => enqueueSnackbar(message)),
  });
};
