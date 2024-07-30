import { type ApolloQueryResult } from "@apollo/client";

import { LecturesQuery } from "api/graphql/generated/graphql";

export interface ITableColumns {
  data: LecturesQuery;
  fetchMore: (options: {
    variables: { offset?: number; limit?: number };
    updateQuery: (
      prev: LecturesQuery,
      {
        fetchMoreResult,
      }: {
        fetchMoreResult: LecturesQuery;
      }
    ) => LecturesQuery;
  }) => Promise<ApolloQueryResult<LecturesQuery>>;
  lectureIds?: string[];
}
