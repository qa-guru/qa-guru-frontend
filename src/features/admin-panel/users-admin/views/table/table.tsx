import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Box, TablePagination, useMediaQuery, useTheme } from "@mui/material";
import { UserDto } from "api/graphql/generated/graphql";
import { FC } from "react";

import { ITable } from "./table.types";
import { StyledLoadMoreButton, StyledPaper } from "./table.styled";
import TablePaginationActions from "../table-pagination-actions";
import DesktopTable from "../desktop-table";
import MobileTable from "../mobile-table";

const TableAdmin: FC<ITable> = ({ data, columns, fetchMore }) => {
  const users = data?.users?.items;
  const theme = useTheme();
  const isDownMd = useMediaQuery(theme.breakpoints.down("md"));
  const isDownSm = useMediaQuery(theme.breakpoints.down("sm"));

  const table = useReactTable({
    data: users as UserDto[],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      columnVisibility: { email: !isDownMd },
    },
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
    <>
      <StyledPaper>
        {isDownSm ? (
          <MobileTable table={table} />
        ) : (
          <DesktopTable table={table} />
        )}
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
        <StyledLoadMoreButton onClick={handleLoadMore} variant="contained">
          Загрузить еще
        </StyledLoadMoreButton>
      </Box>
    </>
  );
};

export default TableAdmin;
