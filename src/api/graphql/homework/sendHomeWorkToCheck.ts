import { useSnackbar } from "notistack";
import { useSendHomeWorkToCheckMutation as _useSendHomeWorkToCheckMutation } from "../generated/graphql";

export const useSendHomeWorkToCheckMutation = () => {
  const { enqueueSnackbar } = useSnackbar();

  return _useSendHomeWorkToCheckMutation({
    onError: (error) =>
      error.graphQLErrors.map(({ message }) => enqueueSnackbar(message)),
  });
};
