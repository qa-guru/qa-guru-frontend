import { useSnackbar } from "notistack";
import { useUpdateCommentMutation as _useUpdateCommentMutation } from "../generated/graphql";

export const useUpdateCommentMutation = () => {
  const { enqueueSnackbar } = useSnackbar();

  return _useUpdateCommentMutation({
    onError: (error) =>
      error.graphQLErrors.map(({ message }) => enqueueSnackbar(message)),
  });
};
