import { styled } from "@mui/system";
import { Box, Button, DialogContent, Paper, Stack, Table } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";

export const StyledPaper = styled(Paper)({
  borderRadius: "2px",
  padding: "5px 0 0",
  margin: "20px 0 40px",
});

export const StyledTable = styled(Table)({
  tableLayout: "fixed",
});

export const StyledDialogContent = styled(DialogContent)({
  textAlign: "center",
});

export const StyledStack = styled(Stack)({
  flexDirection: "column",
  margin: "0 auto",
  gap: "10px",
  maxWidth: "120px",
});

export const StyledLoadMoreButton = styled(Button)(({ theme }) => ({
  color: theme.palette.app.white,
}));

export const StyledBox = styled(Box)({
  marginTop: "25px",
  textAlign: "center",
});

export const StyledInfiniteScroll = styled(InfiniteScroll)({
  overflow: "visible",
});
