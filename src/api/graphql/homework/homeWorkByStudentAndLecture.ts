import {
  HomeWorkByStudentAndLectureQuery,
  HomeWorkByStudentAndLectureQueryVariables,
  useHomeWorkByStudentAndLectureQuery as _useHomeWorkByStudentAndLectureQuery,
} from "../../../generated/graphql";
import { ApolloError } from "@apollo/client/errors";
import * as Apollo from "@apollo/client";
import { useSnackbar } from "notistack";

export const useHomeWorkByStudentAndLectureQuery = (
  baseOptions?: Apollo.QueryHookOptions<
    HomeWorkByStudentAndLectureQuery,
    HomeWorkByStudentAndLectureQueryVariables
  >
) => {
  const { enqueueSnackbar } = useSnackbar();

  return _useHomeWorkByStudentAndLectureQuery({
    onError: (error: ApolloError) =>
      error.graphQLErrors.map(({ message }) => enqueueSnackbar(message)),
    ...baseOptions,
  });
};
