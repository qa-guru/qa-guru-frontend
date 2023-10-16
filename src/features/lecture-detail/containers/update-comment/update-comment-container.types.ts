import { Dispatch, SetStateAction } from "react";

export interface IUpdateCommentContainer {
  id: string;
  setSelectedIndex: Dispatch<SetStateAction<number>>;
  content: string;
}
