import { useLectureHomeWorkByIdQuery as _useLectureHomeWorkByIdQuery } from "../../../generated/graphql";
import { useSnackbar } from "notistack";

export const useLectureHomeWorkByIdQuery = () => {
  const { enqueueSnackbar } = useSnackbar();

  return _useLectureHomeWorkByIdQuery({
    onError: (error) =>
      error.graphQLErrors.map(({ message }) => enqueueSnackbar(message)),
  });
};
