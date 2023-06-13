import React from "react";
import {
  CommentsHomeWorkByHomeWorkQuery,
  UserIdQuery,
} from "../../../../api/graphql/generated/graphql";
import { ApolloQueryResult, FetchMoreQueryOptions } from "@apollo/client";

interface CommentsProps {
  id: string;
  dataCommentsHomeWorkByHomeWork: CommentsHomeWorkByHomeWorkQuery;
  dataUserId: UserIdQuery;
  fetchMore: (
    fetchMoreOptions: FetchMoreQueryOptions<
      CommentsHomeWorkByHomeWorkQuery,
      Record<string, unknown>
    >
  ) => Promise<ApolloQueryResult<CommentsHomeWorkByHomeWorkQuery>>;
  totalElements: number;
}

export interface ICommentsContainer {
  id: string;
  children: React.ReactElement<CommentsProps>;
}
