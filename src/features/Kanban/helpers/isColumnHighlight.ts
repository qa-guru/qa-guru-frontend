import { IsColumnHighlightFunction } from "../views/Column/Column.types";

export const isColumnHighlight: IsColumnHighlightFunction = (
  columnId,
  draggingState
) => {
  return (
    (columnId === "2" && draggingState.newItem) ||
    (["3", "4"].includes(columnId) && draggingState.fromInReview)
  );
};
