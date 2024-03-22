import {
  CommentsHomeWorkByHomeWorkQuery,
  UserIdQuery,
} from "api/graphql/generated/graphql";

export interface ICommentsLimited {
  dataCommentsHomeWorkByHomeWork?: CommentsHomeWorkByHomeWorkQuery;
  dataUserId?: UserIdQuery;
  homeworkId?: string;
}
