import { Dispatch, SetStateAction } from "react";

export interface IUpdateCommentContainer {
  id?: string | null;
  setSelectedComment: Dispatch<SetStateAction<string | null | undefined>>;
  content?: string | null;
}
