import { Table, TableCell, TableRow, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";
import { UserDto } from "api/graphql/generated/graphql";
import { type Table as TableType } from "@tanstack/react-table";

interface IStyledTableWrapper {
  table: TableType<UserDto>;
  rowIndex: number;
}

export const StyledTable = styled(Table)({
  tableLayout: "fixed",
});

export const StyledTableRow = styled(TableRow)({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  alignItems: "center",
});

export const StyledTableCell = styled(TableCell)({
  borderBottom: "none",
});

export const StyledTypography = styled(Typography)({
  fontWeight: "bold",
});

export const StyledBox = styled(Box, {
  shouldForwardProp: (prop) => !["table", "rowIndex"].includes(prop as string),
})<IStyledTableWrapper>(({ table, rowIndex, theme }) => ({
  borderBottom:
    rowIndex === table.getRowModel().rows.length - 1
      ? "none"
      : `1px solid ${theme.palette.app.greyRGBA}`,
}));
