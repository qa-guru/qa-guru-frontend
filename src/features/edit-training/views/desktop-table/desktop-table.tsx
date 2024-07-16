import { flexRender, type Table } from "@tanstack/react-table";
import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { StyledTable, StyledTableRow } from "./desktop-table.styled";

interface IDesktopTable<T> {
  table: Table<T>;
}

const DesktopTable = <T,>({ table }: IDesktopTable<T>) => {
  return (
    <StyledTable>
      <TableHead>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableCell
                key={header.id}
                sx={{ width: header.column.getSize() }}
              >
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
              <TableCell key={cell.id} style={{ width: cell.column.getSize() }}>
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
