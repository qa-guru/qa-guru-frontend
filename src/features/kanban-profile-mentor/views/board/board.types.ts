import { HomeWorksQuery } from "api/graphql/generated/graphql";

export interface IBoard {
  newData: HomeWorksQuery;
  inReviewData: HomeWorksQuery;
  approvedData: HomeWorksQuery;
  notApprovedData: HomeWorksQuery;
  fetchMoreFunctions: Array<
    (options: { variables: { offset: number } }) => void
  >;
}
