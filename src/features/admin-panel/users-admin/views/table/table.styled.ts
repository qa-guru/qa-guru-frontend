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
  height: "calc(100dvh - 360px)",
  overflowY: "auto",
  scrollbarWidth: "none",
  [theme.breakpoints.down("md")]: {
    height: "calc(100dvh - 300px)",
  },
  [theme.breakpoints.down("sm")]: {
    height: "calc(100dvh - 340px)",
    margin: 0,
  },
}));

export const StyledUsersDialogContent = styled(DialogContent)({
  overflowY: "auto",
  margin: 0,
  padding: 0,
});

export const StyledClearIcon = styled(ClearIcon)(({ theme }) => ({
  position: "absolute",
  cursor: "pointer",
  color: theme.palette.app.primary,
  zIndex: 2000,
  top: "8px",
  right: "8px",
  [theme.breakpoints.up("sm")]: {
    top: "12px",
    right: "12px",
  },
}));

export const StyledLoadMoreButton = styled(IconButton)({
  position: "absolute",
  right: "1px",
  top: "83px",
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
