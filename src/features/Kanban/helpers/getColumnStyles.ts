import { isColumnHighlight } from "./isColumnHighlight";
import { GetColumnStylesFunction } from "../views/Column/Column.types";
import { primary } from "../../../theme/colors";

export const getColumnStyles: GetColumnStylesFunction = (
  columnId,
  draggingState,
  isOver
) => {
  if (isColumnHighlight(columnId, draggingState)) {
    return {
      border: "2px dashed",
      borderColor: primary.main,
      backgroundColor: isOver ? primary.secondary : null,
      padding: "6px",
      borderRadius: "4px",
      width: "100%",
      minHeight: "100%",
      display: "flex",
      flexDirection: "column",
    };
  }
  return null;
};
