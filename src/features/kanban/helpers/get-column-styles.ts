import { type Theme, type SxProps, useTheme } from "@mui/system";
import { app } from "theme/colors";
import { alpha } from "@mui/material";
import { Maybe } from "api/graphql/generated/graphql";

import { isColumnHighlight } from "./is-column-highlight";
import { IDraggingState } from "../views/board/board.types";

const theme = useTheme();

const style = {
  emptyColumn: {
    backgroundColor: app.lightGray,
    borderRadius: "10px",
    boxShadow: "0px 2px 6px 2px rgba(0, 0, 0, 0.1)",
    margin: "13px",
    height: "calc(100vh - 100px - 150px - 70px )",
    [theme.breakpoints.down("md")]: {
      height: "calc(100vh - 100px - 190px - 70px )",
    },
  },
  dropColumn: {
    backgroundColor: alpha(app.primary, 0.1),
  },
};

type GetColumnStylesFunction = (
  columnId: string,
  draggingState: IDraggingState,
  canDrop: boolean,
  totalElements: number,
  isOver: boolean
) => Maybe<SxProps<Theme>>;

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
      borderColor: app.primary,
      borderRadius: "10px",
    };
  }

  return styles || {};
};
