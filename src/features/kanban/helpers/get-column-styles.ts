import { type Theme, type SxProps, useTheme } from "@mui/material/styles";
import { alpha } from "@mui/material";
import { lightTheme } from "theme/constans";

import { isColumnHighlight } from "./is-column-highlight";
import { IDraggingState } from "../views/board/board.types";

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
  const theme = useTheme();
  let styles;

  const style = {
    emptyColumn: {
      backgroundColor: lightTheme(theme)
        ? theme.palette.app.lightGray
        : theme.palette.app.secondary,
      borderRadius: "10px",
      height: "calc(100dvh - 100px - 140px - 150px )",
      boxShadow: "0px 2px 6px 2px rgba(0, 0, 0, 0.1)",
      margin: "13px",
    },
    dropColumn: {
      backgroundColor: alpha(theme.palette.app.primary, 0.1),
    },
  };

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
      borderColor: theme.palette.app.primary,
      borderRadius: "10px",
      [theme.breakpoints.down("md")]: {
        height: "calc(100dvh - 100px - 190px - 60px )",
      },
    };
  }

  return styles || {};
};
