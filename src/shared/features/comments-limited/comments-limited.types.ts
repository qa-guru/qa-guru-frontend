import { CommentsHomeWorkByHomeWorkQuery } from "api/graphql/generated/graphql";

export interface ICommentsLimited {
  dataCommentsHomeWorkByHomeWork?: CommentsHomeWorkByHomeWorkQuery;
  homeworkId?: string;
}
