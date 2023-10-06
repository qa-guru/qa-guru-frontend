import React from "react";
import { IColumnItem } from "../../column/column.types";
import { StudentHomeWorkDto } from "../../../../../api/graphql/generated/graphql";

export interface IDesktopBoard {
  columns: IColumnItem[];
  draggingState: {
    newItem: boolean;
    fromInReview: boolean;
    fromNotApproved: boolean;
  };
  setDraggingState: React.Dispatch<
    React.SetStateAction<{
      newItem: boolean;
      fromInReview: boolean;
      fromNotApproved: boolean;
    }>
  >;
  moveCard: (
    cardId: string,
    sourceColumnId: string,
    targetColumnId: string
  ) => Promise<void>;
  fetchMoreFunctions: Array<
    (options: { variables: { offset: number } }) => void
  >;
  showHomeworkDetails: boolean;
  isUpLg: boolean;
  selectedCard: StudentHomeWorkDto | null;
  handleCardClick: (card: StudentHomeWorkDto) => void;
  activeCardId: string | null;
  handleHomeworkDetailsClose: () => void;
}
