import { FC } from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { TrainingDto } from "api/graphql/generated/graphql";
import {
  Box,
  TablePagination,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { ITable } from "./table.types";
import {
  StyledLoadMoreButton,
  StyledPaper,
  StyledTable,
  StyledTableRow,
} from "./table.styled";
import TablePaginationActions from "../table-pagination-actions";

const Table: FC<ITable> = ({ data, columns, fetchMore }) => {
  const trainings = data?.trainings?.items;

  const table = useReactTable({
    data: trainings as TrainingDto[],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const { pageSize, pageIndex } = table.getState().pagination;

  const handleLoadMore = async () => {
    await fetchMore({
      variables: {
        offset: trainings?.length,
        limit: 50,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          trainings: {
            ...fetchMoreResult.trainings,
            items: [
              ...(prev?.trainings?.items || []),
              ...(fetchMoreResult?.trainings?.items || []),
            ],
          },
        };
      },
    });
  };
  return (
    <>
      <StyledPaper>
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
                  <TableCell
                    key={cell.id}
                    style={{ width: cell.column.getSize() }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
        </StyledTable>
        <TablePagination
          rowsPerPageOptions={[
            5,
            10,
            25,
            { label: "All", value: Number(data?.trainings?.totalElements) },
          ]}
          component="div"
          count={table.getFilteredRowModel().rows.length}
          rowsPerPage={pageSize}
          page={pageIndex}
          onPageChange={(_, page) => {
            table.setPageIndex(page);
          }}
          onRowsPerPageChange={(e) => {
            const size = e.target.value ? Number(e.target.value) : 10;
            table.setPageSize(size);
          }}
          ActionsComponent={TablePaginationActions}
        />
      </StyledPaper>
      <Box textAlign="center" pb="20px">
        <StyledLoadMoreButton onClick={handleLoadMore} variant="contained">
          Загрузить еще
        </StyledLoadMoreButton>
      </Box>
    </>
  );
};

export default Table;
