import { useDeleteUserMutation as _useDeleteUserMutation } from "../../../generated/graphql";
import { useSnackbar } from "notistack";

export const useDeleteUserMutation = () => {
  const { enqueueSnackbar } = useSnackbar();

  return _useDeleteUserMutation({
    onError: (error) =>
      error.graphQLErrors.map(({ message }) => enqueueSnackbar(message)),
  });
};
