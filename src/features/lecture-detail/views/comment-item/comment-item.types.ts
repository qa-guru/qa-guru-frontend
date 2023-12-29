import { Dispatch, SetStateAction } from "react";
import { CommentHomeWorkDto, Maybe } from "api/graphql/generated/graphql";

export interface ICommentItem {
  item?: Maybe<CommentHomeWorkDto>;
  editAccess: boolean;
  isSelected: boolean;
  setSelectedComment: Dispatch<SetStateAction<Maybe<string | undefined>>>;
  commentId?: Maybe<string>;
  depth?: number;
}
