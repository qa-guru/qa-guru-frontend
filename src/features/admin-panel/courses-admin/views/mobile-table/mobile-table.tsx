import React, { FC } from "react";
import { type Table, flexRender } from "@tanstack/react-table";
import { TableBody } from "@mui/material";

import { TrainingDto } from "api/graphql/generated/graphql";

import {
  StyledTable,
  StyledTableCell,
  StyledTableRow,
} from "./mobile-table.styled";

interface IMobileTable {
  table: Table<TrainingDto>;
}

const MobileTable: FC<IMobileTable> = ({ table }) => {
  return (
    <StyledTable>
      <TableBody>
        {table.getRowModel().rows.map((row, rowIndex) => (
          <StyledTableRow key={row.id} rowIndex={rowIndex} table={table}>
            {row.getVisibleCells().map((cell) => {
              return (
                <React.Fragment key={row.id + cell.id}>
                  <StyledTableCell>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </StyledTableCell>
                </React.Fragment>
              );
            })}
          </StyledTableRow>
        ))}
      </TableBody>
    </StyledTable>
  );
};

export default MobileTable;
