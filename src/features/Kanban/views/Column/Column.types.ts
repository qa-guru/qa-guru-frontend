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

type FetchMoreVariables = {
  offset: number;
};

type FetchMoreUpdateQuery = (
  prev: { homeWorks: { items: StudentHomeWorkDto[] } },
  {
    fetchMoreResult,
  }: { fetchMoreResult: { homeWorks: { items: StudentHomeWorkDto[] } } }
) => {
  homeWorks: {
    items: StudentHomeWorkDto[];
  };
};

export interface IColumn {
  fetchMore: (options: {
    variables: FetchMoreVariables;
    updateQuery: FetchMoreUpdateQuery;
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
