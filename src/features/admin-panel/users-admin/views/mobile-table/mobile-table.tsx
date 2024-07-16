import React, { FC, Fragment } from "react";
import { type Table, flexRender } from "@tanstack/react-table";
import { UserDto } from "api/graphql/generated/graphql";
import { TableBody } from "@mui/material";

import {
  StyledTable,
  StyledTableCell,
  StyledTableHeader,
  StyledTableRow,
  StyledTypography,
} from "./mobile-table.styled";

interface IMobileTable {
  table: Table<UserDto>;
}

const MobileTable: FC<IMobileTable> = ({ table }) => {
  return (
    <StyledTable>
      <TableBody>
        {table.getRowModel().rows.map((row, rowIndex) => (
          <StyledTableRow key={row.id} rowIndex={rowIndex} table={table}>
            {row.getVisibleCells().map((cell, cellIndex) => {
              const header = table.getHeaderGroups()[0].headers[cellIndex];

              return (
                <Fragment key={row.id + cell.id}>
                  <StyledTableHeader>
                    <StyledTypography variant="subtitle2">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </StyledTypography>
                  </StyledTableHeader>

                  <StyledTableCell sx={{}}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </StyledTableCell>
                </Fragment>
              );
            })}
          </StyledTableRow>
        ))}
      </TableBody>
    </StyledTable>
  );
};

export default MobileTable;
