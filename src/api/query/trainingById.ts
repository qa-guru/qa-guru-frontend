import { useTrainingByIdQuery as _useTrainingByIdQuery } from "../../generated/graphql";
import { useSnackbar } from "notistack";

export const useTrainingByIdQuery = () => {
  const { enqueueSnackbar } = useSnackbar();

  return _useTrainingByIdQuery({
    onError: (error) =>
      error.graphQLErrors.map(({ message }) => enqueueSnackbar(message)),
  });
};
