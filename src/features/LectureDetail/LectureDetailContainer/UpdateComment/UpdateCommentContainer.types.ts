import React from "react";

export interface IUpdateCommentContainer {
  id: string;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  content: string;
}
