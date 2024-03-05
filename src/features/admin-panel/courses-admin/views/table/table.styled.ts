import { Button, Paper, Table, TableRow } from "@mui/material";
import { styled } from "@mui/system";

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
  margin: "20px 0 40px",
});

export const StyledLoadMoreButton = styled(Button)(({ theme }) => ({
  color: theme.palette.app.white,
}));
