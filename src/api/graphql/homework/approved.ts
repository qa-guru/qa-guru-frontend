import { useSnackbar } from "notistack";
import { useApprovedMutation as _useApprovedMutation } from "../generated/graphql";

export const useApprovedMutation = () => {
  const { enqueueSnackbar } = useSnackbar();

  return _useApprovedMutation({
    onError: (error) =>
      error.graphQLErrors.map(({ message }) => enqueueSnackbar(message)),
  });
};
