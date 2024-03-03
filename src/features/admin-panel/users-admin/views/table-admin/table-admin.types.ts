import { type ApolloQueryResult } from "@apollo/client";
import { type ColumnDef } from "@tanstack/react-table";
import { UserDto, UsersQuery } from "api/graphql/generated/graphql";

export interface ITableAdmin {
  data: UsersQuery;
  fetchMore: (options: {
    variables: { offset?: number; limit?: number };
    updateQuery: (
      prev: UsersQuery,
      {
        fetchMoreResult,
      }: {
        fetchMoreResult: UsersQuery;
      }
    ) => UsersQuery;
  }) => Promise<ApolloQueryResult<UsersQuery>>;
  columns: ColumnDef<UserDto>[];
}
