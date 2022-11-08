import { usePersonQuery as _usePersonQuery } from "../../generated/graphql";
import { useSnackbar } from "notistack";

export const usePersonQuery = () => {
  const { enqueueSnackbar } = useSnackbar();

  return _usePersonQuery({
    onError: (error) =>
      error.graphQLErrors.map(({ message }) => enqueueSnackbar(message)),
  });
};
