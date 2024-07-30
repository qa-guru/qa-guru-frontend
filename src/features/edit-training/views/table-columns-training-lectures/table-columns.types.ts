import { type ApolloQueryResult } from "@apollo/client";

import {
  TrainingLecturesQuery,
  TrainingsQuery,
} from "api/graphql/generated/graphql";

export interface ITableColumns {
  data: TrainingLecturesQuery;
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
