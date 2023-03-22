import { useSnackbar } from "notistack";
import { useHomeWorkByLectureQuery as _useHomeWorkByLectureQuery } from "../generated/graphql";

export const useHomeWorkByLectureQuery = () => {
  const { enqueueSnackbar } = useSnackbar();

  return _useHomeWorkByLectureQuery({
    onError: (error) =>
      error.graphQLErrors.map(({ message }) => enqueueSnackbar(message)),
  });
};
