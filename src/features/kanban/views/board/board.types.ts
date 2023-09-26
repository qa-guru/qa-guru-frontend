import { HomeWorksQuery } from "../../../../../../../../Downloads/qa-guru-frontend-develop 2/src/api/graphql/generated/graphql";

type FetchMoreFunction = (options: {
  variables: { offset: number };
  updateQuery?: (
    prev: HomeWorksQuery,
    { fetchMoreResult }: { fetchMoreResult?: HomeWorksQuery }
  ) => HomeWorksQuery;
}) => void;

export interface IBoard {
  newData: HomeWorksQuery;
  inReviewData: HomeWorksQuery;
  approvedData: HomeWorksQuery;
  notApprovedData: HomeWorksQuery;
  fetchMoreFunctions: Array<
    (options: { variables: { offset: number } }) => void
  >;
}

export interface IDraggingState {
  newItem: boolean;
  fromInReview: boolean;
  fromNotApproved: boolean;
}
