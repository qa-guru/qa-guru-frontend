import { useSendHomeWorkToCheckMutation as _useSendHomeWorkToCheckMutation } from "../../../generated/graphql";
import { useSnackbar } from "notistack";

export const useSendHomeWorkToCheckMutation = () => {
  const { enqueueSnackbar } = useSnackbar();

  return _useSendHomeWorkToCheckMutation({
    onError: (error) =>
      error.graphQLErrors.map(({ message }) => enqueueSnackbar(message)),
  });
};
