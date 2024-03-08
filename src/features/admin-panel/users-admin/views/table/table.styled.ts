import { styled } from "@mui/system";
import { Box, Button, DialogContent, Paper, Stack, Table } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import ClearIcon from "@mui/icons-material/Clear";

export const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: "2px",
  padding: "5px 0 0",
  margin: "20px 0 40px",
  height: "calc(100vh - 100px - 220px - 70px )",
  overflowY: "auto",
  [theme.breakpoints.down("md")]: {
    height: "calc(100vh - 100px - 220px - 150px )",
  },
  [theme.breakpoints.down("sm")]: {
    height: "calc(100vh - 100px - 255px - 150px )",
    margin: "20px 0 10px",
  },
}));

export const StyledUsersDialogContent = styled(DialogContent)({
  overflowY: "auto",
  maxHeight: "calc(100vh - 200px)",
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

export const StyledLoadMoreButton = styled(Button)(({ theme }) => ({
  margin: "5px 0",
  color: theme.palette.app.primary,
  textAlign: "center",
  width: "100%",
}));

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
