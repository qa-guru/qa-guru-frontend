import { FC } from "react";
import { type Table, flexRender } from "@tanstack/react-table";
import { Maybe, UserDto } from "api/graphql/generated/graphql";
import { TableBody } from "@mui/material";
import { useNavigate } from "react-router-dom";

import {
  StyledTable,
  StyledTableCell,
  StyledTableRow,
  StyledTypography,
} from "./mobile-table.styled";

interface IMobileTable {
  table: Table<UserDto>;
}

const MobileTable: FC<IMobileTable> = ({ table }) => {
  const navigate = useNavigate();

  const handleRowClick = (userId?: Maybe<string>) => {
    navigate(`/users/${userId}`);
  };

  return (
    <StyledTable>
      <TableBody>
        {table.getRowModel().rows.map((row, rowIndex) => (
          <StyledTableRow key={row.id} rowIndex={rowIndex} table={table}>
            {row.getVisibleCells().map((cell, cellIndex) => {
              const header = table.getHeaderGroups()[0].headers[cellIndex];

              return (
                <>
                  <StyledTableCell>
                    <StyledTypography variant="subtitle2">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </StyledTypography>
                  </StyledTableCell>

                  <StyledTableCell>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </StyledTableCell>
                </>
              );
            })}
          </StyledTableRow>
        ))}
      </TableBody>
    </StyledTable>
  );
};

export default MobileTable;
