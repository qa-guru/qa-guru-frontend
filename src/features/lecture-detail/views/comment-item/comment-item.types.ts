import { Dispatch, SetStateAction } from "react";
import { CommentHomeWorkDto } from "api/graphql/generated/graphql";

export interface ICommentItem {
  item: CommentHomeWorkDto;
  editAccess: boolean;
  isSelected: boolean;
  setSelectedIndex: Dispatch<SetStateAction<number>>;
  index: number;
}
