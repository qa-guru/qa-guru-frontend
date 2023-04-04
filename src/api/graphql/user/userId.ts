import { ApolloError } from "@apollo/client/errors";
import { useSnackbar } from "notistack";
import { useUserIdQuery as _useUserIdQuery } from "../generated/graphql";

export const useUserIdQuery = () => {
  const { enqueueSnackbar } = useSnackbar();

  return _useUserIdQuery({
    onError: (error: ApolloError) =>
      error.graphQLErrors.map(({ message }) => enqueueSnackbar(message)),
  });
};
