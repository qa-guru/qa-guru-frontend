import { useUpdateRoleMutation as _useUpdateRoleMutation } from "../../../generated/graphql";
import { useSnackbar } from "notistack";

export const useUpdateRoleMutation = () => {
  const { enqueueSnackbar } = useSnackbar();

  return _useUpdateRoleMutation({
    onError: (error) =>
      error.graphQLErrors.map(({ message }) => enqueueSnackbar(message)),
  });
};
