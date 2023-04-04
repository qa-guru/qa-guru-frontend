import { ReactNode } from "react";
import {
  CommentsHomeWorkByHomeWorkQuery,
  UserQuery,
} from "../../../api/graphql/generated/graphql";

export interface IComment {
  dataCommentsHomeWorkByHomeWork?: CommentsHomeWorkByHomeWorkQuery;
  dataUserId?: UserQuery;
  id?: string;
  fetchMore?: any;
}

export interface ICommentContainer {
  id: string;
  children: ReactNode;
}
