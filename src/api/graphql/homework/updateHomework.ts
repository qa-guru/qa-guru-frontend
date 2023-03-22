import { useSnackbar } from "notistack";
import { useUpdateHomeworkMutation as _useUpdateHomeworkMutation } from "../generated/graphql";

export const useUpdateHomeworkMutation = () => {
  const { enqueueSnackbar } = useSnackbar();

  return _useUpdateHomeworkMutation({
    onError: (error) =>
      error.graphQLErrors.map(({ message }) => enqueueSnackbar(message)),
  });
};
