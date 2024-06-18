import { type ApolloQueryResult } from "@apollo/client";
import { type ColumnDef, type Table } from "@tanstack/react-table";
import {
  Maybe,
  TrainingDto,
  TrainingsQuery,
} from "api/graphql/generated/graphql";

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

export interface IModalMobileTable {
  hideModal: () => void;
  open: boolean;
  table: Table<TrainingDto>;
  hasMoreTrainings: boolean;
  handleLoadMore: () => Promise<void>;
  trainings?: Maybe<Array<Maybe<TrainingDto>>>;
}
