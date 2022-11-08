import { useLecturesQuery as _useLecturesQuery } from "../../generated/graphql";
import { useSnackbar } from "notistack";

export const useLecturesQuery = () => {
  const { enqueueSnackbar } = useSnackbar();

  return _useLecturesQuery({
    onError: (error) =>
      error.graphQLErrors.map(({ message }) => enqueueSnackbar(message)),
  });
};
