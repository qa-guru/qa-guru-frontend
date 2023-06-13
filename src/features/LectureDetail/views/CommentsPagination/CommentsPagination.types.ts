import {
  CommentsHomeWorkByHomeWorkQuery,
  UserIdQuery,
} from "../../../../api/graphql/generated/graphql";

export interface ICommentsPagination {
  dataCommentsHomeWorkByHomeWork?: CommentsHomeWorkByHomeWorkQuery;
  dataUserId?: UserIdQuery;
  id?: string;
  fetchMore?: ((options: {
    variables: { offset?: number };
    updateQuery: (
      prev: CommentsHomeWorkByHomeWorkQuery,
      { fetchMoreResult }: { fetchMoreResult?: CommentsHomeWorkByHomeWorkQuery }
    ) => CommentsHomeWorkByHomeWorkQuery;
  }) => void);
}
