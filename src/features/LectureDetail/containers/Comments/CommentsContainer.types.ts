import React from "react";
import {
  CommentsHomeWorkByHomeWorkQuery,
  UserIdQuery,
} from "../../../../api/graphql/generated/graphql";

interface CommentsProps {
  id: string;
  dataCommentsHomeWorkByHomeWork: CommentsHomeWorkByHomeWorkQuery;
  dataUserId: UserIdQuery;
  fetchMore: any;
  totalElements: number;
}

export interface ICommentsContainer {
  id: string;
  children: React.ReactElement<CommentsProps>;
}
