import { useUpdatePersonMutation as _useUpdatePersonMutation } from "../../../generated/graphql";
import { useSnackbar } from "notistack";

export const useUpdatePersonMutation = () => {
  const { enqueueSnackbar } = useSnackbar();

  return _useUpdatePersonMutation({
    onError: (error) =>
      error.graphQLErrors.map(({ message }) => enqueueSnackbar(message)),
  });
};
