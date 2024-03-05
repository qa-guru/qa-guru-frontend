import { type ApolloQueryResult } from "@apollo/client";
import { TrainingsQuery } from "api/graphql/generated/graphql";

export interface ITableColumns {
  data: TrainingsQuery;
  fetchMore: (options: {
    variables: { offset?: number; limit?: number };
    updateQuery: (
      prev: TrainingsQuery,
      {
        fetchMoreResult,
      }: {
        fetchMoreResult: TrainingsQuery;
      }
    ) => TrainingsQuery;
  }) => Promise<ApolloQueryResult<TrainingsQuery>>;
}
