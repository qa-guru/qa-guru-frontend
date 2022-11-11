import {
  LectureByIdQuery,
  LectureByIdQueryVariables,
  useLectureByIdQuery as _useLectureByIdQuery,
} from "../../../generated/graphql";
import { ApolloError } from "@apollo/client/errors";
import * as Apollo from "@apollo/client";
import { useSnackbar } from "notistack";

export const useLectureById = (
  baseOptions?: Apollo.QueryHookOptions<
    LectureByIdQuery,
    LectureByIdQueryVariables
  >
) => {
  const { enqueueSnackbar } = useSnackbar();

  return _useLectureByIdQuery({
    onError: (error: ApolloError) =>
      error.graphQLErrors.map(({ message }) => enqueueSnackbar(message)),
    ...baseOptions,
  });
};
