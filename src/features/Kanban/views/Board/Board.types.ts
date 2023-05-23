import { HomeWorksQuery } from "../../../../api/graphql/generated/graphql";

export interface IBoard {
  newData: HomeWorksQuery;
  inReviewData: HomeWorksQuery;
  approvedData: HomeWorksQuery;
  notApprovedData: HomeWorksQuery;
  fetchMoreFunctions: any;
}

export interface IDraggingState {
  newItem: boolean;
  fromInReview: boolean;
  fromNotApproved: boolean;
}
