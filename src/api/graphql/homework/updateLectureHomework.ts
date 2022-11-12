import { useUpdateLectureHomeWorkMutation as _useUpdateLectureHomeWorkMutation } from "../../../generated/graphql";
import { useSnackbar } from "notistack";

export const useUpdateLectureHomeWorkMutation = () => {
  const { enqueueSnackbar } = useSnackbar();

  return _useUpdateLectureHomeWorkMutation({
    onError: (error) =>
      error.graphQLErrors.map(({ message }) => enqueueSnackbar(message)),
  });
};
