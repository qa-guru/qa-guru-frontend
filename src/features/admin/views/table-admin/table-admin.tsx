import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Box,
  Button,
  Container,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { UserDto } from "api/graphql/generated/graphql";
import { FC } from "react";
import { ITableAdmin } from "./table-admin.types";
import { StyledPaper, StyledTable, StyledTitle } from "./table-admin.styled";
import TablePaginationActions from "../table-pagination-actions";

const TableAdmin: FC<ITableAdmin> = ({ data, columns, fetchMore }) => {
  const users = data?.users?.items;

  const table = useReactTable({
    data: users as UserDto[],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
  });

  const { pageSize, pageIndex } = table.getState().pagination;

  const handleLoadMore = async () => {
    await fetchMore({
      variables: {
        offset: users?.length,
        limit: 50,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          users: {
            ...fetchMoreResult.users,
            items: [
              ...(prev?.users?.items || []),
              ...(fetchMoreResult?.users?.items || []),
            ],
          },
        };
      },
    });
  };

  return (
    <Container>
      <StyledTitle variant="h2">{`Пользователи (${data?.users?.totalElements})`}</StyledTitle>
      <StyledPaper>
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
            {table.getRowModel().rows.map((row) => {
              return (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </StyledTable>
        <TablePagination
          rowsPerPageOptions={[
            5,
            10,
            25,
            { label: "All", value: Number(data?.users?.totalElements) },
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
        <Button onClick={handleLoadMore} variant="contained">
          Загрузить еще
        </Button>
      </Box>
    </Container>
  );
};

export default TableAdmin;
