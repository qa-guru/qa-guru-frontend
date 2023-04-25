import React from "react";
import { CommentHomeWorkDto } from "../../../../api/graphql/generated/graphql";

export interface ICommentItem {
  item: CommentHomeWorkDto;
  editAccess: boolean;
  isSelected: boolean;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  index: number;
}
