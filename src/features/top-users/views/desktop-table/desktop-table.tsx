import { flexRender, type Table } from "@tanstack/react-table";
import { UserRatingDto } from "api/graphql/generated/graphql";
import { FC } from "react";
import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { StyledTable, StyledTableRow } from "./desktop-table.styled";

interface IDesktopTable {
  table: Table<UserRatingDto>;
}

const DesktopTable: FC<IDesktopTable> = ({ table }) => {
  return (
    <StyledTable>
      <TableHead>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableCell key={header.id}>
                <Typography variant="subtitle2">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <StyledTableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </StyledTableRow>
        ))}
      </TableBody>
    </StyledTable>
  );
};

export default DesktopTable;
