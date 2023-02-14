import {
  HomeWorkByStudentAndLectureIdQuery,
  HomeWorkByStudentAndLectureIdQueryVariables,
  useHomeWorkByStudentAndLectureIdQuery as _useHomeWorkByStudentAndLectureIdQuery,
} from "../../../generated/graphql";
import { ApolloError } from "@apollo/client/errors";
import * as Apollo from "@apollo/client";

export const useHomeWorkByStudentAndLectureIdQuery = (
  baseOptions: Apollo.QueryHookOptions<
    HomeWorkByStudentAndLectureIdQuery,
    HomeWorkByStudentAndLectureIdQueryVariables
  >
) => {
  return _useHomeWorkByStudentAndLectureIdQuery({
    onError: (error: ApolloError) =>
      error.graphQLErrors.map(({ message }) => console.log(error)),
    ...baseOptions,
  });
};
