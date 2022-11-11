import { useUpdateLectureMutation as _useUpdateLectureMutation } from "../../../generated/graphql";
import { useSnackbar } from "notistack";

export const useUpdateLectureMutation = () => {
  const { enqueueSnackbar } = useSnackbar();

  return _useUpdateLectureMutation({
    onError: (error) =>
      error.graphQLErrors.map(({ message }) => enqueueSnackbar(message)),
  });
};
