import { useUsersQuery as _useUsersQuery } from "../../../generated/graphql";
import { useSnackbar } from "notistack";

export const useUsersQuery = () => {
  const { enqueueSnackbar } = useSnackbar();

  return _useUsersQuery({
    onError: (error) =>
      error.graphQLErrors.map(({ message }) => enqueueSnackbar(message)),
  });
};
