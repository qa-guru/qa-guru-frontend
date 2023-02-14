import { useUserIdQuery as _useUserIdQuery } from "../../../generated/graphql";
import { useSnackbar } from "notistack";

export const useUserIdQuery = () => {
  const { enqueueSnackbar } = useSnackbar();

  return _useUserIdQuery({
    onError: (error) =>
      error.graphQLErrors.map(({ message }) => enqueueSnackbar(message)),
  });
};
