import {
  HomeWorkByStudentAndLectureStatusQuery,
  HomeWorkByStudentAndLectureStatusQueryVariables,
  useHomeWorkByStudentAndLectureStatusQuery as _useHomeWorkByStudentAndLectureStatusQuery,
} from "../../../generated/graphql";
import { ApolloError } from "@apollo/client/errors";
import * as Apollo from "@apollo/client";

export const useHomeWorkByStudentAndLectureStatusQuery = (
  baseOptions: Apollo.QueryHookOptions<
    HomeWorkByStudentAndLectureStatusQuery,
    HomeWorkByStudentAndLectureStatusQueryVariables
  >
) => {
  return _useHomeWorkByStudentAndLectureStatusQuery({
    onError: (error: ApolloError) =>
      error.graphQLErrors.map(({ message }) => console.log(error)),
    ...baseOptions,
  });
};
