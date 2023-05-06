import React from "react";
// eslint-disable-next-line import/named
import { SxProps, Theme } from "@mui/material";
import {
  StudentHomeWorkDto,
  StudentHomeWorkStatus,
} from "../../../../api/graphql/generated/graphql";

export interface IExtendedCard extends StudentHomeWorkDto {
  allowedColumns: string[];
}

export interface IColumnItem {
  id: string;
  title: StudentHomeWorkStatus;
  cards: IExtendedCard[];
  totalElements: number;
}

export interface IDraggingState {
  newItem: boolean;
  fromInReview: boolean;
  fromNotApproved: boolean;
}
export interface IColumn {
  fetchMore: any;
  draggingState: IDraggingState;
  setDraggingState: React.Dispatch<React.SetStateAction<IDraggingState>>;
  column: IColumnItem;
  onCardDrop: (
    cardId: string,
    sourceColumnId: string,
    targetColumnId: string
  ) => void;
}

export type GetColumnStylesFunction = (
  columnId: string,
  draggingState: IDraggingState,
  isOver: boolean
) => SxProps<Theme> | null;

export type IsColumnHighlightFunction = (
  columnId: string,
  draggingState: IDraggingState
) => boolean;
