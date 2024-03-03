import { Table, TableRow } from "@mui/material";
import { styled } from "@mui/system";

export const StyledTable = styled(Table)({
  tableLayout: "fixed",
});

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.app.secondary,
  },
}));
