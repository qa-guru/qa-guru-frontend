import { Box, Paper, Table, TableRow } from "@mui/material";
import { styled } from "@mui/system";
import InfiniteScroll from "react-infinite-scroll-component";

export const StyledTable = styled(Table)({
  tableLayout: "fixed",
});

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.app.secondary,
  },
}));

export const StyledPaper = styled(Paper)({
  borderRadius: "2px",
  padding: "5px 0 0",
  margin: "20px 5px 40px",
  height: "calc(100vh - 100px - 160px - 70px )",
  overflowY: "auto",
});

export const StyledInfiniteScroll = styled(InfiniteScroll)({
  overflow: "visible",
});

export const StyledBox = styled(Box)({
  marginTop: "25px",
  textAlign: "center",
});
