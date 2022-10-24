import showErrorGraphQL from "../../error/showErrorGraphQL";
import {
  LectureByIdQuery,
  LectureByIdQueryVariables,
  useLectureByIdQuery as _useLectureByIdQuery,
} from "../../generated/graphql";
import { ApolloError } from "@apollo/client/errors";
import * as Apollo from "@apollo/client";

const options = {
  onError: (error: ApolloError) => showErrorGraphQL(error),
};

export const useLectureHomeWorkById = (
  baseOptions?: Apollo.QueryHookOptions<
    LectureByIdQuery,
    LectureByIdQueryVariables
  >
) => {
  return _useLectureByIdQuery({ ...options, ...baseOptions });
};
