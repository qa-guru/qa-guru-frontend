import showErrorGraphQL from "../../error/showErrorGraphQL";
import { useUpdateLectureHomeWorkMutation as _useUpdateLectureHomeWorkMutation } from "../../generated/graphql";
import { ApolloError } from "@apollo/client/errors";
import * as Apollo from "@apollo/client";
import { client } from "../../http";

const options = {
  onError: (error: ApolloError) => showErrorGraphQL(error),
};

export const useUpdateLectureHomeWorkMutation = () => {
  return _useUpdateLectureHomeWorkMutation({ ...options });
};
