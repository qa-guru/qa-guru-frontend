// eslint-disable-next-line import/named
import { styled, Theme } from "@mui/system";
import { Box, Button, Typography } from "@mui/material";
// import { isColumnHighlight } from "../../helpers/is-column-highlight";
// import { getColumnStyles } from "../../helpers/get-column-styles";
import { IDraggingState } from "../board/board.types";

type IStyledScrollBox = {
  theme: Theme;
  columnId: string;
  draggingState: IDraggingState;
  isOver: boolean;
  showButton: boolean;
  totalElements: string;
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
  fontSize: "20px",
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

// const StyledScrollBox = styled(Box)<IStyledScrollBox>(
//   ({ theme, columnId, draggingState, isOver, showButton, totalElements }) => ({
//     ...getColumnStyles(columnId, draggingState, isOver),
//     boxSizing: "border-box",
//     overflowY: showButton ? "hidden" : "auto",
//     maxHeight: "73vh",
//     [theme.breakpoints.up("md")]: {
//       maxHeight: "69vh",
//     },
//     backgroundColor:
//       Number(totalElements) === 0
//         ? {
//             backgroundColor: theme.palette.grey.light,
//             borderRadius: "10px",
//             height: "69vh",
//             boxShadow: "0px 2px 6px 2px rgba(0, 0, 0, 0.1)",
//             margin: 10,
//           }
//         : "inherit",
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

export const StyledEmptyColumn = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey.light,
  borderRadius: "10px",
  height: "73vh",
  [theme.breakpoints.up("sm")]: {
    height: "69vh",
  },
  boxShadow: "0px 2px 6px 2px rgba(0, 0, 0, 0.1)",
  margin: 10,
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  margin: "1vh auto",
}));
