import { Dispatch, SetStateAction } from "react";

export interface IUpdateCommentContainer {
  id?: string | null;
  setSelectedIndex: Dispatch<SetStateAction<number>>;
  content?: string | null;
}
