import { ApolloError } from "@apollo/client/errors";
import { useSnackbar } from "notistack";
import * as Apollo from "@apollo/client";
import {
  LectureHomeWorkQuery,
  LectureHomeWorkQueryVariables,
  useLectureHomeWorkQuery as _useLectureHomeWorkQuery,
} from "../generated/graphql";

export const useLectureHomeWorkQuery = (
  baseOptions?: Apollo.QueryHookOptions<
    LectureHomeWorkQuery,
    LectureHomeWorkQueryVariables
  >
) => {
  const { enqueueSnackbar } = useSnackbar();

  return _useLectureHomeWorkQuery({
    onError: (error: ApolloError) =>
      error.graphQLErrors.map(({ message }) => enqueueSnackbar(message)),
    ...baseOptions,
  });
};
