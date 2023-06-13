import { HomeWorksQuery, HomeWorksQueryVariables } from "../../../../api/graphql/generated/graphql";

export interface IBoard {
  newData: HomeWorksQuery;
  inReviewData: HomeWorksQuery;
  approvedData: HomeWorksQuery;
  notApprovedData: HomeWorksQuery;
  fetchMoreFunctions: ((options: { variables: HomeWorksQueryVariables }) => void)[];
}

export interface IDraggingState {
  newItem: boolean;
  fromInReview: boolean;
  fromNotApproved: boolean;
}
