import React from "react";

export interface IUpdateHomeworkContainer {
  setOpenHomeWorkEdit: React.Dispatch<React.SetStateAction<boolean>>;
  answer: string;
  id: string;
}
