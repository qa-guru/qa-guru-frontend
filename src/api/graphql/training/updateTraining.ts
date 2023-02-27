import { useSnackbar } from "notistack";
import { useUpdateTrainingMutation as _useUpdateTrainingMutation } from "../generated/graphql";

export const useUpdateTrainingMutation = () => {
  const { enqueueSnackbar } = useSnackbar();

  return _useUpdateTrainingMutation({
    onError: (error) =>
      error.graphQLErrors.map(({ message }) => enqueueSnackbar(message)),
  });
};
