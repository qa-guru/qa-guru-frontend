import {
  CommentsHomeWorkByHomeWorkQuery,
  UserQuery,
} from "../../../api/graphql/generated/graphql";

export interface ICommentLimited {
  dataCommentsHomeWorkByHomeWork?: CommentsHomeWorkByHomeWorkQuery;
  dataUserId?: UserQuery;
  id?: string;
}
