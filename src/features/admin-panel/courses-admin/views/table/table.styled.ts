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
  height: "calc(100dvh - 324px)",
  overflowY: "auto",
  [theme.breakpoints.down("md")]: {
    height: "calc(100dvh - 244px)",
  },
  [theme.breakpoints.down("sm")]: {
    height: "calc(100dvh - 209px)",
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
  zIndex: "1",
  top: "8px",
  right: "12px",
  [theme.breakpoints.up("sm")]: {
    top: "12px",
    right: "24px",
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
