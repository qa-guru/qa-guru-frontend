import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import { TrainingDto } from "api/graphql/generated/graphql";
import { type Table as TableType } from "@tanstack/react-table";

interface IStyledTableWrapper {
  table: TableType<TrainingDto>;
  rowIndex: number;
}

export const StyledTable = styled(Table)({
  tableLayout: "fixed",
  padding: 0,
});

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: "none",
  padding: "5px 0",
  [theme.breakpoints.only("xs")]: {
    marginRight: "5px",
  },
}));

export const StyledTypography = styled(Typography)({
  fontWeight: "bold",
});

export const StyledTableRow = styled(TableRow, {
  shouldForwardProp: (prop) => !["table", "rowIndex"].includes(prop as string),
})<IStyledTableWrapper>(({ table, rowIndex, theme }) => ({
  borderBottom:
    rowIndex === table.getRowModel().rows.length - 1
      ? "none"
      : `1px solid ${theme.palette.app.secondary}`,
  display: "grid",
  alignItems: "center",
  overflowX: "hidden",
}));
