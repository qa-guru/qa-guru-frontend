import { type ApolloQueryResult } from "@apollo/client";
import { UsersQuery } from "api/graphql/generated/graphql";

export interface ITableColumns {
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
}
