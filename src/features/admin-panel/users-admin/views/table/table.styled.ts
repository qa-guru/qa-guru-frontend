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
  height: "calc(100vh - 100px - 215px - 60px)",
  overflowY: "auto",
  [theme.breakpoints.down("md")]: {
    height: "calc(100dvh - 100px - 145px - 60px)",
  },
  [theme.breakpoints.down("sm")]: {
    height: "calc(100dvh - 100px - 140px - 60px)",
    margin: "20px 0 0",
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
