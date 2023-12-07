// eslint-disable-next-line import/named
import { Theme, SxProps } from "@mui/system";
import { grey, primary } from "theme/colors";

import { isColumnHighlight } from "./is-column-highlight";
import { IDraggingState } from "../views/board/board.types";

const style = {
  emptyColumn: {
    backgroundColor: grey.light,
    borderRadius: "10px",
    height: "69vh",
    boxShadow: "0px 2px 6px 2px rgba(0, 0, 0, 0.1)",
    margin: "13px",
  },
  dropColumn: {
    backgroundColor: primary.secondary,
  },
};

type GetColumnStylesFunction = (
  columnId: string,
  draggingState: IDraggingState,
  canDrop: boolean,
  totalElements: number,
  isOver: boolean
) => SxProps<Theme> | null;

export const getColumnStyles: GetColumnStylesFunction = (
  columnId,
  draggingState,
  canDrop,
  totalElements,
  isOver
) => {
  let styles;

  if (isOver && canDrop) {
    styles = style.dropColumn;
  }

  if (Number(totalElements) === 0) {
    styles = style.emptyColumn;
  }

  if (isColumnHighlight(columnId, draggingState)) {
    return {
      ...styles,
      border: "2px dashed",
      borderColor: primary.main,
      borderRadius: "10px",
    };
  }

  return styles || {};
};
