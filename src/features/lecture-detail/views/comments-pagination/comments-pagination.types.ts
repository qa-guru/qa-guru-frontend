import {
  CommentsHomeWorkByHomeWorkQuery,
  UserIdQuery,
} from "api/graphql/generated/graphql";

export interface ICommentsPagination {
  dataCommentsHomeWorkByHomeWork?: CommentsHomeWorkByHomeWorkQuery;
  dataUserId?: UserIdQuery;
  id?: string;
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
