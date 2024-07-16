import { IDraggingState } from "features/kanban-mentor/views/board/board.types";
import { STATUS_COLUMN } from "features/kanban-mentor/constants";

type IsColumnHighlight = (
  columnId: string,
  draggingState: IDraggingState
) => boolean;

export const isColumnHighlight: IsColumnHighlight = (
  columnId,
  draggingState
) => {
  const columnHighlightMap: { [key: string]: boolean } = {
    [STATUS_COLUMN.IN_REVIEW]: draggingState.newItem,
    [STATUS_COLUMN.APPROVED]:
      draggingState.fromInReview || draggingState.fromNotApproved,
    [STATUS_COLUMN.NOT_APPROVED]: draggingState.fromInReview,
  };

  return columnHighlightMap[columnId] || false;
};
