import React from "react";
import {
  StudentHomeWorkDto,
  StudentHomeWorkStatus,
} from "../../../../../api/graphql/generated/graphql";

export interface IExtendedCard extends StudentHomeWorkDto {
  allowedColumns: string[];
}

export interface IColumnItem {
  id: string;
  title: StudentHomeWorkStatus;
  cards: IExtendedCard[];
}
export interface IColumn {
  isDraggingFromInReview: boolean;
  isDraggingNewItem: boolean;
  setIsDraggingNewItem: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDraggingFromInReview: React.Dispatch<React.SetStateAction<boolean>>;
  column: IColumnItem;
  onCardDrop: (
    cardId: string,
    sourceColumnId: string,
    targetColumnId: string
  ) => void;
}
