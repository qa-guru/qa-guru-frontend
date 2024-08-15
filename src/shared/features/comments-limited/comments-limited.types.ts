import { Dispatch, SetStateAction } from "react";

import { CommentsHomeWorkByHomeWorkQuery } from "api/graphql/generated/graphql";

export interface ICommentsLimited {
  dataCommentsHomeWorkByHomeWork?: CommentsHomeWorkByHomeWorkQuery;
  homeworkId?: string;
  setTotalElements?: Dispatch<SetStateAction<number>>;
}
