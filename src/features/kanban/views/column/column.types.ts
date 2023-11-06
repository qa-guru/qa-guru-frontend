import { Dispatch, SetStateAction } from "react";
import {
  StudentHomeWorkDto,
  StudentHomeWorkStatus,
} from "api/graphql/generated/graphql";
import { IDraggingState } from "../board/board.types";

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
    variables: { offset: number };
    updateQuery: (
      prev: { homeWorks: { items: StudentHomeWorkDto[] } },
      {
        fetchMoreResult,
      }: { fetchMoreResult: { homeWorks: { items: StudentHomeWorkDto[] } } }
    ) => {
      homeWorks: {
        items: StudentHomeWorkDto[];
      };
    };
  }) => void;
  draggingState: IDraggingState;
  setDraggingState: Dispatch<SetStateAction<IDraggingState>>;
  column: IColumnItem;
  onCardDrop: (
    cardId: string,
    sourceColumnId: string,
    targetColumnId: string
  ) => void;
  onCardClick: ((card: StudentHomeWorkDto) => void) | void;
  isActive?: boolean;
  activeCardId?: string | null;
}
