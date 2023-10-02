import { IDraggingState } from "../views/board/board.types";

type IsColumnHighlight = (
  columnId: string,
  draggingState: IDraggingState
) => boolean;

export const isColumnHighlight: IsColumnHighlight = (
  columnId,
  draggingState
) => {
  const columnHighlightMap: { [key: string]: boolean } = {
    "2": draggingState.newItem,
    "3": draggingState.fromInReview || draggingState.fromNotApproved,
    "4": draggingState.fromInReview,
  };

  return columnHighlightMap[columnId] || false;
};
