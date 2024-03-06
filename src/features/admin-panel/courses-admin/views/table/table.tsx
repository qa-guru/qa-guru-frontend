import { FC, useEffect, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { TrainingDto } from "api/graphql/generated/graphql";
import {
  CircularProgress,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { ITable } from "./table.types";
import {
  StyledBox,
  StyledInfiniteScroll,
  StyledPaper,
  StyledTable,
  StyledTableRow,
} from "./table.styled";

const Table: FC<ITable> = ({ data, columns, fetchMore }) => {
  const trainings = data?.trainings?.items;
  const { totalElements } = data?.trainings!;
  const [hasMoreTrainings, setHasMoreTrainings] = useState<boolean>(true);

  const table = useReactTable({
    data: trainings as TrainingDto[],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

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

  useEffect(() => {
    if (trainings?.length! >= totalElements) {
      setHasMoreTrainings(false);
    }
  }, [trainings]);

  return (
    <StyledPaper id="scroll-container-lol">
      <StyledInfiniteScroll
        dataLength={trainings?.length || 0}
        next={handleLoadMore}
        hasMore={hasMoreTrainings}
        loader={
          <StyledBox>
            <CircularProgress size={25} />
          </StyledBox>
        }
        scrollableTarget="scroll-container-lol"
      >
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
      </StyledInfiniteScroll>
    </StyledPaper>
  );
};

export default Table;
