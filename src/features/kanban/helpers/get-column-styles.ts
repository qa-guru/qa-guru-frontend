import { type Theme, type SxProps, useTheme } from "@mui/material/styles";
import { alpha } from "@mui/material";
import { lightTheme } from "theme/constans";
import { isColumnHighlight } from "shared/helpers";

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
      maxHeight: "calc(100dvh - 256px)",
      boxShadow: "0px 2px 6px 2px rgba(0, 0, 0, 0.1)",
      margin: "13px",
      [theme.breakpoints.only("sm")]: {
        margin: "8px 5px 5px",
      },
      [theme.breakpoints.down("md")]: {
        maxHeight: "calc(100dvh - 272px)",
      },
      [theme.breakpoints.down("sm")]: {
        maxHeight: "calc(100dvh - 242px)",
      },
    },
    dropColumn: {
      backgroundColor: alpha(theme.palette.app.primary, 0.1),
    },
  };

  if (Number(totalElements) === 0) {
    styles = style.emptyColumn;
  }

  if (isOver && canDrop) {
    styles = style.dropColumn;
  }

  if (isColumnHighlight(columnId, draggingState)) {
    return {
      ...styles,
      border: `2px dashed ${theme.palette.app.primary}`,
      borderRadius: "10px",
      maxHeight: "calc(100dvh - 254px)",
    };
  }

  return styles || {};
};
