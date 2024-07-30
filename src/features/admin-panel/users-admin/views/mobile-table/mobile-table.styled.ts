import { Table, TableCell, TableRow, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { type Table as TableType } from "@tanstack/react-table";

import { UserDto } from "api/graphql/generated/graphql";

interface IStyledTableWrapper {
  table: TableType<UserDto>;
  rowIndex: number;
}

export const StyledTable = styled(Table)({
  tableLayout: "fixed",
  padding: 0,
});

export const StyledTableHeader = styled(TableCell)({
  marginLeft: "59px",
  borderBottom: "none",
  padding: "5px 0",
});

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  marginLeft: "59px",
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
  position: "relative",
  borderBottom:
    rowIndex === table.getRowModel().rows.length - 1
      ? "none"
      : `1px solid ${theme.palette.app.secondary}`,
  display: "grid",
  gridTemplateColumns: "110px 1fr",
  alignItems: "center",
  overflowX: "hidden",
}));
