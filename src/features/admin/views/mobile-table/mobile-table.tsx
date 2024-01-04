import { FC } from "react";
import { type Table, flexRender } from "@tanstack/react-table";
import { UserDto } from "api/graphql/generated/graphql";
import { TableBody } from "@mui/material";

import {
  StyledBox,
  StyledTable,
  StyledTableCell,
  StyledTableRow,
  StyledTypography,
} from "./mobile-table.styled";

interface IMobileTable {
  table: Table<UserDto>;
}

const MobileTable: FC<IMobileTable> = ({ table }) => {
  return (
    <>
      {table.getRowModel().rows.map((row, rowIndex) => (
        <StyledBox key={row.id} rowIndex={rowIndex} table={table}>
          <StyledTable>
            <TableBody>
              {row.getVisibleCells().map((cell, cellIndex) => {
                const header = table.getHeaderGroups()[0].headers[cellIndex];

                return (
                  <StyledTableRow key={cell.id}>
                    <StyledTableCell component="th" scope="row">
                      <StyledTypography variant="subtitle2">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </StyledTypography>
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </StyledTable>
        </StyledBox>
      ))}
    </>
  );
};

export default MobileTable;
