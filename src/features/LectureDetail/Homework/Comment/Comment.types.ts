import React from "react";
import { CommentsHomeWorkByHomeWorkQuery } from "../../../../api/graphql/generated/graphql";

export interface IComment {
  data: CommentsHomeWorkByHomeWorkQuery;
  setTotalElements: React.Dispatch<React.SetStateAction<any>>;
}

export interface ICommentContainer {
  id: string;
  size: number;
  field: any;
  order: any;
  setTotalElements: React.Dispatch<React.SetStateAction<any>>;
}
