import { ApolloError } from "@apollo/client/errors";
import { useSnackbar } from "notistack";
import * as Apollo from "@apollo/client";
import {
  HomeWorksByLectureIdQuery,
  HomeWorksByLectureIdQueryVariables,
  useHomeWorksByLectureIdQuery as _useHomeWorksByLectureIdQuery,
} from "../generated/graphql";

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
