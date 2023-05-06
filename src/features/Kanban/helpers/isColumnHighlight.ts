import { IsColumnHighlightFunction } from "../views/Column/Column.types";

export const isColumnHighlight: IsColumnHighlightFunction = (
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
