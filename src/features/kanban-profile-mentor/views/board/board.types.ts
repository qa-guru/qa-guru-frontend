import { HomeworksQuery } from "api/graphql/generated/graphql";

export interface IBoard {
  newData: HomeworksQuery;
  inReviewData: HomeworksQuery;
  approvedData: HomeworksQuery;
  notApprovedData: HomeworksQuery;
  fetchMoreFunctions: Array<
    (options: { variables: { offset: number } }) => void
  >;
}
