import { CommentsHomeWorkByHomeWorkQuery } from "api/graphql/generated/graphql";

export interface ICommentsPagination {
  dataCommentsHomeWorkByHomeWork?: CommentsHomeWorkByHomeWorkQuery;
  homeworkId?: string;
  fetchMore?: (options: {
    variables: { offset?: number };
    updateQuery: (
      prev: { commentsHomeWorkByHomeWork: { items: Comment[] } },
      {
        fetchMoreResult,
      }: {
        fetchMoreResult: { commentsHomeWorkByHomeWork: { items: Comment[] } };
      }
    ) => { commentsHomeWorkByHomeWork: { items: Comment[] } };
  }) => void;
}
