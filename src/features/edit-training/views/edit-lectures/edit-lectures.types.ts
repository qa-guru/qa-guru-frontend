import { type ApolloQueryResult } from "@apollo/client";
import { type ColumnDef } from "@tanstack/react-table";

import {
  TrainingLectureDto,
  TrainingLecturesQuery,
  TrainingsQuery,
} from "api/graphql/generated/graphql";

export interface ITable {
  data: TrainingLecturesQuery;
  fetchMore: (options: {
    variables: { offset?: number; limit?: number };
    updateQuery: (
      prev: TrainingLecturesQuery,
      {
        fetchMoreResult,
      }: {
        fetchMoreResult: TrainingLecturesQuery;
      }
    ) => TrainingsQuery;
  }) => Promise<ApolloQueryResult<TrainingLecturesQuery>>;
  columns: ColumnDef<TrainingLectureDto>[];
}
