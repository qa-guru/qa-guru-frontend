import {
  LectureQuery,
  LectureQueryVariables,
  useLectureQuery as _useLectureQuery,
} from "../../../generated/graphql";
import { ApolloError } from "@apollo/client/errors";
import * as Apollo from "@apollo/client";
import { useSnackbar } from "notistack";

export const useLectureQuery = (
  baseOptions?: Apollo.QueryHookOptions<LectureQuery, LectureQueryVariables>
) => {
  const { enqueueSnackbar } = useSnackbar();

  return _useLectureQuery({
    onError: (error: ApolloError) =>
      error.graphQLErrors.map(({ message }) => enqueueSnackbar(message)),
    ...baseOptions,
  });
};
