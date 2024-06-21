import { styled } from "@mui/system";
import {
  Box,
  DialogContent,
  IconButton,
  Paper,
  Stack,
  Table,
} from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import ClearIcon from "@mui/icons-material/Clear";

export const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: "10px",
  padding: "5px 0 0",
  margin: "20px 0 40px",
  height: "calc(100dvh - 278px)",
  overflowY: "auto",
  [theme.breakpoints.down("md")]: {
    height: "calc(100dvh - 305px)",
  },
  [theme.breakpoints.down("sm")]: {
    height: "calc(100dvh - 222px)",
  },
}));

export const StyledUsersDialogContent = styled(DialogContent)({
  overflowY: "auto",
  margin: 0,
  padding: "15px 0 0",
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

export const StyledStack = styled(Stack)({
  flexDirection: "column",
  margin: "0 auto",
  gap: "10px",
  maxWidth: "120px",
});

export const StyledBox = styled(Box)({
  marginTop: "25px",
  textAlign: "center",
});

export const StyledInfiniteScroll = styled(InfiniteScroll)({
  overflow: "visible",
});
