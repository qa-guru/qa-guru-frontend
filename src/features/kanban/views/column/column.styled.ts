// column.styled.ts
import { styled, Theme } from "@mui/system";
import { Box, Button, Typography } from "@mui/material";
import { getColumnStyles } from "../../helpers/get-column-styles";
import { isColumnHighlight } from "../../helpers/is-column-highlight";
import { IDraggingState } from "../board/board.types";

type IStyledScrollBox = {
  theme: Theme;
  columnId: string;
  draggingState: IDraggingState;
  isOver: boolean;
  showButton: boolean;
};

export const StyledBoxContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "25%",
  },
  flexGrow: "1",
  display: "flex",
  flexDirection: "column",
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  marginBottom: theme.spacing(1),
}));

// export const StyledScrollBox = styled(Box)<IStyledScrollBox>(
//   ({ theme, columnId, draggingState, isOver, showButton }) => ({
//     flexGrow: "1",
//     maxHeight: "73vh",
//     [theme.breakpoints.up("md")]: {
//       maxHeight: "69vh",
//     },
//     ...getColumnStyles(columnId, draggingState, isOver),
//     boxSizing: "border-box",
//     overflowY: showButton ? "hidden" : "auto",
//     ...(isColumnHighlight(columnId, draggingState) && {
//       "&::-webkit-scrollbar": {
//         display: "none",
//       },
//     }),
//   })
// );

export const StyledCircularProgress = styled(Box)(({ theme }) => ({
  marginTop: "10px",
  display: "flex",
  justifyContent: "center",
}));

export const StyledCardBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  margin: "1vh auto",
}));
