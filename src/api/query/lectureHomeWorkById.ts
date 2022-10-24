import showErrorGraphQL from "../../error/showErrorGraphQL";
import {
  LectureHomeWorkByIdQuery,
  LectureHomeWorkByIdQueryVariables,
  useLectureHomeWorkByIdQuery as _useLectureHomeWorkByIdQuery,
} from "../../generated/graphql";
import { ApolloError } from "@apollo/client/errors";
import * as Apollo from "@apollo/client";

const options = {
  onError: (error: ApolloError) => showErrorGraphQL(error),
};

export const useLectureHomeWorkById = (
  baseOptions?: Apollo.QueryHookOptions<
    LectureHomeWorkByIdQuery,
    LectureHomeWorkByIdQueryVariables
  >
) => {
  return _useLectureHomeWorkByIdQuery({ ...options, ...baseOptions });
};
