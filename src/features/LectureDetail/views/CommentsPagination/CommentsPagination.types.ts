import {
  CommentsHomeWorkByHomeWorkQuery,
  UserIdQuery,
} from "../../../../api/graphql/generated/graphql";

export interface ICommentsPagination {
  dataCommentsHomeWorkByHomeWork?: CommentsHomeWorkByHomeWorkQuery;
  dataUserId?: UserIdQuery;
  id?: string;
  fetchMore?: any;
}
