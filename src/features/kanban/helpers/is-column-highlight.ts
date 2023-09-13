import { IDraggingState } from "../views/board/board.types";

type IsColumnHighlight = (
  columnId: string,
  draggingState: IDraggingState
) => boolean;

export const isColumnHighlight: IsColumnHighlight = (
  columnId,
  draggingState
) => {
  const { newItem, fromInReview, fromNotApproved } = draggingState;

  const isDragNewToInReview = columnId === "2" && newItem;
  const isDragInReviewToApprovedOrNot =
    ["3", "4"].includes(columnId) && fromInReview;
  const isDragNotApprovedToApproved = columnId === "3" && fromNotApproved;

  return (
    isDragNewToInReview ||
    isDragInReviewToApprovedOrNot ||
    isDragNotApprovedToApproved
  );
};
