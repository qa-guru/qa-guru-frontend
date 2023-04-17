import { useSnackbar } from "notistack";
import { useNotApprovedMutation as _useNotApprovedMutation } from "../generated/graphql";

export const useNotApprovedMutation = () => {
  const { enqueueSnackbar } = useSnackbar();

  return _useNotApprovedMutation({
    onError: (error) =>
      error.graphQLErrors.map(({ message }) => enqueueSnackbar(message)),
  });
};
