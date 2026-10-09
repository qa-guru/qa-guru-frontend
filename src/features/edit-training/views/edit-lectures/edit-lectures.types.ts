import {
  type ApolloQueryResult,
  type FetchMoreQueryOptions,
} from "@apollo/client";
import { type ColumnDef } from "@tanstack/react-table";

import {
  TrainingLectureDto,
  TrainingLecturesQuery,
} from "api/graphql/generated/graphql";

export interface ITable {
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
  columns: ColumnDef<TrainingLectureDto>[];
}
