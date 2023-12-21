import { ReactElement } from "react";
import {
  type ApolloQueryResult,
  type FetchMoreQueryOptions,
} from "@apollo/client";
import {
  CommentsHomeWorkByHomeWorkQuery,
  CommentsHomeWorkByHomeWorkQueryVariables,
  UserIdQuery,
} from "api/graphql/generated/graphql";

interface CommentsProps {
  id: string;
  dataCommentsHomeWorkByHomeWork: CommentsHomeWorkByHomeWorkQuery;
  dataUserId: UserIdQuery;
  fetchMore: (
    fetchMoreOptions: FetchMoreQueryOptions<
      CommentsHomeWorkByHomeWorkQueryVariables,
      CommentsHomeWorkByHomeWorkQuery
    >
  ) => Promise<ApolloQueryResult<CommentsHomeWorkByHomeWorkQuery>>;
  totalElements: number;
}

export interface ICommentsContainer {
  id?: string | null;
  children: ReactElement<CommentsProps>;
}
