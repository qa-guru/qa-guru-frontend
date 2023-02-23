import { ApolloError } from "@apollo/client/errors";
import * as Apollo from "@apollo/client";
import {
  HomeWorkByStudentAndLectureQuery,
  HomeWorkByStudentAndLectureQueryVariables,
  useHomeWorkByStudentAndLectureQuery as _useHomeWorkByStudentAndLectureQuery,
} from "../../../generated/graphql";

export const useHomeWorkByStudentAndLectureQuery = (
  baseOptions?: Apollo.QueryHookOptions<
    HomeWorkByStudentAndLectureQuery,
    HomeWorkByStudentAndLectureQueryVariables
  >
) => {
  return _useHomeWorkByStudentAndLectureQuery({
    onError: (error: ApolloError) =>
      error.graphQLErrors.map(({ message }) => console.log(error)),
    ...baseOptions,
  });
};
