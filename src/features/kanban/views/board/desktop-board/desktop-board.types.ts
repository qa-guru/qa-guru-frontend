import { Dispatch, SetStateAction } from "react";
import { StudentHomeWorkDto } from "api/graphql/generated/graphql";
import { IColumnItem } from "../../column/column.types";

export interface IDesktopBoard {
  columns: IColumnItem[];
  draggingState: {
    newItem: boolean;
    fromInReview: boolean;
    fromNotApproved: boolean;
  };
  setDraggingState: Dispatch<
    SetStateAction<{
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
