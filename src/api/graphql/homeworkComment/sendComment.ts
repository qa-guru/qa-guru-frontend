import { useSnackbar } from "notistack";
import { useSendCommentMutation as _useSendCommentMutation } from "../generated/graphql";

export const useSendCommentMutation = () => {
  const { enqueueSnackbar } = useSnackbar();

  return _useSendCommentMutation({
    onError: (error) =>
      error.graphQLErrors.map(({ message }) => enqueueSnackbar(message)),
  });
};
