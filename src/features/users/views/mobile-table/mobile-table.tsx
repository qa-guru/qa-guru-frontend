import { FC, Fragment } from "react";
import { type Table, flexRender } from "@tanstack/react-table";
import { UserRatingDto } from "api/graphql/generated/graphql";
import { TableBody } from "@mui/material";

import {
  StyledTable,
  StyledTableCell,
  StyledTableRow,
  StyledTypography,
} from "./mobile-table.styled";

interface IMobileTable {
  table: Table<UserRatingDto>;
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
                  <StyledTableCell key={header.id}>
                    <StyledTypography variant="subtitle2">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </StyledTypography>
                  </StyledTableCell>

                  <StyledTableCell key={cell.id}>
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
