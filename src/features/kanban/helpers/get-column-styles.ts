// eslint-disable-next-line import/named
import { SxProps, Theme } from "@mui/system";
import { primary } from "theme/colors";
import { isColumnHighlight } from "./is-column-highlight";
import { IDraggingState } from "../views/board/board.types";

type GetColumnStylesFunction = (
  columnId: string,
  draggingState: IDraggingState,
  isOver: boolean
) => SxProps<Theme> | null;

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
      minHeight: "80%",
      display: "flex",
      flexDirection: "column",
    };
  }
  return null;
};
