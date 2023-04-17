import { useSnackbar } from "notistack";
import { useTakeForReviewMutation as _useTakeForReviewMutation } from "../generated/graphql";

export const useTakeForReviewMutation = () => {
  const { enqueueSnackbar } = useSnackbar();

  return _useTakeForReviewMutation({
    onError: (error) =>
      error.graphQLErrors.map(({ message }) => enqueueSnackbar(message)),
  });
};
