// eslint-disable-next-line import/named
import { ApolloQueryResult } from "@apollo/client";
import {
  HomeWorksByLectureIdQuery,
  UserIdQuery,
} from "../../../../api/graphql/generated/graphql";

export interface IHomeworksOtherStudents {
  data: HomeWorksByLectureIdQuery;
  fetchMore: (options: {
    variables: { offset?: number; limit?: number };
    updateQuery: (
      prev: HomeWorksByLectureIdQuery,
      {
        fetchMoreResult,
      }: {
        fetchMoreResult: HomeWorksByLectureIdQuery;
      }
    ) => HomeWorksByLectureIdQuery;
  }) => Promise<ApolloQueryResult<HomeWorksByLectureIdQuery>>;

  dataUserId: UserIdQuery;
}
