import {
  HomeWorksByLectureIdQuery,
  HomeWorksByLectureIdQueryVariables,
  useHomeWorksByLectureIdQuery as _useHomeWorksByLectureIdQuery,
} from "../../../generated/graphql";
import { ApolloError } from "@apollo/client/errors";
import * as Apollo from "@apollo/client";
import { useSnackbar } from "notistack";

export const useHomeWorksByLectureIdQuery = (
  baseOptions?: Apollo.QueryHookOptions<
    HomeWorksByLectureIdQuery,
    HomeWorksByLectureIdQueryVariables
  >
) => {
  const { enqueueSnackbar } = useSnackbar();

  return _useHomeWorksByLectureIdQuery({
    onError: (error: ApolloError) =>
      error.graphQLErrors.map(({ message }) => enqueueSnackbar(message)),
    ...baseOptions,
  });
};
