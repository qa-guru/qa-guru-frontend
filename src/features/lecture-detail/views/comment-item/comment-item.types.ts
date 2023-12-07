import { Dispatch, SetStateAction } from "react";
import { CommentHomeWorkDto } from "api/graphql/generated/graphql";

export interface ICommentItem {
  item?: CommentHomeWorkDto | null;
  editAccess: boolean;
  isSelected: boolean;
  setSelectedComment: Dispatch<SetStateAction<string | null | undefined>>;
  commentId: string | null | undefined;
  depth?: number;
}
