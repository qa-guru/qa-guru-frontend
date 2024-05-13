import { styled } from "@mui/system";
import { Box, DialogContent, IconButton, Paper, Table } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import ClearIcon from "@mui/icons-material/Clear";

export const StyledNotFoundBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "400px",
  [theme.breakpoints.down("md")]: {
    height: "200px",
  },
}));

export const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: "10px",
  padding: "5px 0 0",
  margin: "20px 0 40px",
  height: "calc(100dvh - 354px)",
  overflowY: "auto",
  scrollbarWidth: "none",
  [theme.breakpoints.down("md")]: {
    height: "calc(100dvh - 294px)",
  },
  [theme.breakpoints.down("sm")]: {
    height: "calc(100dvh - 334px)",
    margin: 0,
  },
}));

export const StyledUsersDialogContent = styled(DialogContent)({
  overflowY: "auto",
  margin: 0,
  padding: "20px 0 0",
  scrollbarWidth: "none",
});

export const StyledIconBox = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  justifyContent: "flex-end",
  [theme.breakpoints.only("xs")]: {
    position: "fixed",
    top: 0,
    right: 0,
    zIndex: 2000,
    width: "100%",
    backgroundColor: theme.palette.app.menu,
  },
}));

export const StyledClearIcon = styled(ClearIcon)(({ theme }) => ({
  color: theme.palette.app.primary,
  marginRight: "5px",
  [theme.breakpoints.up("sm")]: {
    position: "absolute",
    cursor: "pointer",
    zIndex: 2000,
    top: "2px",
    right: "4px",
  },
}));

export const StyledLoadMoreButton = styled(IconButton)({
  position: "absolute",
  right: "1px",
  top: "63px",
  margin: 0,
});

export const StyledTable = styled(Table)({
  tableLayout: "fixed",
});

export const StyledBox = styled(Box)({
  marginTop: "25px",
  textAlign: "center",
});

export const StyledInfiniteScroll = styled(InfiniteScroll)({
  overflow: "visible",
});
