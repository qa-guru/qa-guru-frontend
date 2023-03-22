import {
  CommentsHomeWorkByHomeWorkQuery,
  UserQuery,
} from "../../../../api/graphql/generated/graphql";

export interface IComment {
  dataCommentsHomeWorkByHomeWork: CommentsHomeWorkByHomeWorkQuery;
  dataUser: UserQuery;
  id: string;
  fetchMore: any;
}

export interface ICommentContainer {
  id: string;
}
