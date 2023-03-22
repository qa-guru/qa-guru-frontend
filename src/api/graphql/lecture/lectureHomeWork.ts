import { useSnackbar } from "notistack";
import { useLectureHomeWorkQuery as _useLectureHomeWorkQuery } from "../generated/graphql";

export const useLectureHomeWorkQuery = () => {
  const { enqueueSnackbar } = useSnackbar();

  return _useLectureHomeWorkQuery({
    onError: (error) =>
      error.graphQLErrors.map(({ message }) => enqueueSnackbar(message)),
  });
};
