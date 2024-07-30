import { type ApolloQueryResult } from "@apollo/client";
import { type ColumnDef, type Table } from "@tanstack/react-table";

import { Maybe, UserDto, UsersQuery } from "api/graphql/generated/graphql";

export interface ITable {
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

export interface IModalMobileTable {
  hideModal: () => void;
  open: boolean;
  table: Table<UserDto>;
  hasMoreUsers: boolean;
  handleLoadMore: () => Promise<void>;
  users?: Maybe<Array<Maybe<UserDto>>>;
}
