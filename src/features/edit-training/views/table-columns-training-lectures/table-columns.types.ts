import {
  type ApolloQueryResult,
  type FetchMoreQueryOptions,
} from "@apollo/client";

import { TrainingLecturesQuery } from "api/graphql/generated/graphql";

export interface ITableColumns {
  data: TrainingLecturesQuery;
  fetchMore: (
    options: FetchMoreQueryOptions<
      Record<string, unknown>,
      TrainingLecturesQuery
    > & {
      updateQuery?: (
        prev: TrainingLecturesQuery,
        options: { fetchMoreResult?: TrainingLecturesQuery }
      ) => TrainingLecturesQuery;
    }
  ) => Promise<ApolloQueryResult<TrainingLecturesQuery>>;
}
