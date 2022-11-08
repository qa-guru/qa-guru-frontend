import { useUpdateTrainingMutation as _useUpdateTrainingMutation } from "../../generated/graphql";
import { useSnackbar } from "notistack";

export const useUpdateTrainingMutation = () => {
  const { enqueueSnackbar } = useSnackbar();

  return _useUpdateTrainingMutation({
    onError: (error) =>
      error.graphQLErrors.map(({ message }) => enqueueSnackbar(message)),
  });
};
