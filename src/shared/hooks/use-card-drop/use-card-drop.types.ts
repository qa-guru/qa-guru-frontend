import {
  StudentHomeWorkDto,
  StudentHomeWorkStatus,
} from "api/graphql/generated/graphql";

export interface DropCollectedProps {
  isOver: boolean;
  canDrop: boolean;
}

export interface IExtendedCard extends StudentHomeWorkDto {
  allowedColumns: string[];
}

interface IColumnItem {
  id: string;
  title: StudentHomeWorkStatus;
  cards: IExtendedCard[];
  totalElements: number;
}

export interface IUseCardDrop {
  column: IColumnItem;
  onCardDrop: (
    cardId: string,
    sourceColumnId: string,
    targetColumnId: string
  ) => void;
}
