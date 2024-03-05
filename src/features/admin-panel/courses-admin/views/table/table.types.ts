import { type ApolloQueryResult } from "@apollo/client";
import { type ColumnDef } from "@tanstack/react-table";
import { TrainingDto, TrainingsQuery } from "api/graphql/generated/graphql";

export interface ITable {
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
  columns: ColumnDef<TrainingDto>[];
}
