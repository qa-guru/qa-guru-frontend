import React from "react";
import {
  StudentHomeWorkDto,
  StudentHomeWorkStatus,
} from "../../../../api/graphql/generated/graphql";
import { IDraggingState } from "../Board/Board.types";

export interface CardType {
  id: string;
  sourceColumnId: string;
  allowedColumns: string[];
}
export interface IExtendedCard extends StudentHomeWorkDto {
  allowedColumns: string[];
}

export interface IColumnItem {
  id: string;
  title: StudentHomeWorkStatus;
  cards: IExtendedCard[];
  totalElements: number;
}

export interface IColumn {
  fetchMore: any;
  draggingState: IDraggingState;
  setDraggingState: React.Dispatch<React.SetStateAction<IDraggingState>>;
  column: IColumnItem;
  userId: string;
  onCardDrop: (
    cardId: string,
    sourceColumnId: string,
    targetColumnId: string
  ) => void;
}
