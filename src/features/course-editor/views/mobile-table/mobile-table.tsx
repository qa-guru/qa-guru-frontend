import React, { FC } from "react";
import { flexRender, type Table } from "@tanstack/react-table";
import { TrainingLectureDto } from "api/graphql/generated/graphql";
import { TableBody } from "@mui/material";

import {
  StyledTable,
  StyledTableCell,
  StyledTableRow,
} from "./mobile-table.styled";

interface IMobileTable {
  table: Table<TrainingLectureDto>;
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
