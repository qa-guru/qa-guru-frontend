import { type ApolloQueryResult } from "@apollo/client";
import { type ColumnDef } from "@tanstack/react-table";

import { LectureDto, LecturesQuery } from "api/graphql/generated/graphql";

export interface ISelectLecture {
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
  columns: ColumnDef<LectureDto>[];
}
