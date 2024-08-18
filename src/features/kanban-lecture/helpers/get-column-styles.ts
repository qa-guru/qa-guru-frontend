import { type SxProps, type Theme, useTheme } from "@mui/material/styles";
import { useReactiveVar } from "@apollo/client";

import { lightThemeVar } from "cache";

type GetColumnStylesFunction = (totalElements: number) => SxProps<Theme> | null;

export const getColumnStyles: GetColumnStylesFunction = (totalElements) => {
  const theme = useTheme();
  const lightTheme = useReactiveVar(lightThemeVar);

  let styles;

  const style = {
    emptyColumn: {
      backgroundColor: lightTheme
        ? theme.palette.app.lightGray
        : theme.palette.app.secondary,
      borderRadius: "10px",
      maxHeight: "calc(100dvh - 290px )",
      boxShadow: "0px 2px 6px 2px rgba(0, 0, 0, 0.1)",
      margin: "13px 13px 0",
    },
  };

  if (Number(totalElements) === 0) {
    styles = style.emptyColumn;
  }

  return styles || {};
};
