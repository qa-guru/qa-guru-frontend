import { Table, TableCell, TableRow, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { type Table as TableType } from "@tanstack/react-table";

import { UserRatingDto } from "api/graphql/generated/graphql";

interface IStyledTableWrapper {
  table: TableType<UserRatingDto>;
  rowIndex: number;
}

export const StyledTable = styled(Table)({
  tableLayout: "fixed",
});

export const StyledTableHeader = styled(TableCell)({
  marginLeft: "59px",
  borderBottom: "none",
  padding: "6px 0",
});

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  marginLeft: "59px",
  borderBottom: "none",
  padding: "6px 0",
  [theme.breakpoints.down("md")]: {
    marginRight: "10px",
  },
}));

export const StyledTypography = styled(Typography)({
  fontWeight: "bold",
});

export const StyledTableRow = styled(TableRow, {
  shouldForwardProp: (prop) => !["table", "rowIndex"].includes(prop as string),
})<IStyledTableWrapper>(({ table, rowIndex, theme }) => ({
  position: "relative",
  borderBottom:
    rowIndex === table.getRowModel().rows.length - 1
      ? "none"
      : `1px solid ${theme.palette.app.secondary}`,
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  alignItems: "center",
  padding: "10px 0",
}));
