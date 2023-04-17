import React from "react";
import { StudentHomeWorkDto } from "../../../../../api/graphql/generated/graphql";

export interface ICard {
  card: StudentHomeWorkDto;
  sourceColumnId: string;
  allowedColumns: string[];
  setIsDraggingNewItem: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDraggingFromInReview: React.Dispatch<React.SetStateAction<boolean>>;
  isCardsHidden: boolean;
}
