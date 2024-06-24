import { type ApolloQueryResult } from "@apollo/client";
import { type ColumnDef, type Table } from "@tanstack/react-table";
import {
  Maybe,
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

export interface IModalMobileTable {
  hideModal: () => void;
  open: boolean;
  table: Table<TrainingLectureDto>;
  hasMoreTrainingLectures: boolean;
  handleLoadMore: () => Promise<void>;
  trainingLectures?: Maybe<Array<Maybe<TrainingLectureDto>>>;
}
