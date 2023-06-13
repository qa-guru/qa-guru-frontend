import React from "react";
import {
  HomeWorksQueryVariables,
  StudentHomeWorkDto,
  StudentHomeWorkStatus
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
  fetchMore: (options: {
    variables: HomeWorksQueryVariables;
    updateQuery: (
      prev: { homeWorks: { items: IExtendedCard[] } },
      { fetchMoreResult }: { fetchMoreResult?: { homeWorks: { items: IExtendedCard[] } } }
    ) => void;
  }) => void;
  draggingState: IDraggingState;
  setDraggingState: React.Dispatch<React.SetStateAction<IDraggingState>>;
  column: IColumnItem;
  onCardDrop: (
    cardId: string,
    sourceColumnId: string,
    targetColumnId: string
  ) => void;
}
