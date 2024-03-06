import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { CircularProgress, useMediaQuery, useTheme } from "@mui/material";
import { UserDto } from "api/graphql/generated/graphql";
import { FC, useEffect, useState } from "react";

import { ITable } from "./table.types";
import { StyledBox, StyledInfiniteScroll, StyledPaper } from "./table.styled";
import DesktopTable from "../desktop-table";
import MobileTable from "../mobile-table";

const TableAdmin: FC<ITable> = ({ data, columns, fetchMore }) => {
  const users = data?.users?.items;
  const { totalElements } = data?.users!;
  const theme = useTheme();
  const isDownMd = useMediaQuery(theme.breakpoints.down("md"));
  const isDownSm = useMediaQuery(theme.breakpoints.down("sm"));
  const [hasMoreUsers, setHasMoreUsers] = useState<boolean>(true);

  const table = useReactTable({
    data: users as UserDto[],
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnVisibility: { email: !isDownMd },
    },
  });

  const handleLoadMore = async () => {
    await fetchMore({
      variables: {
        offset: users?.length,
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

  useEffect(() => {
    if (users?.length! >= totalElements) {
      setHasMoreUsers(false);
    }
  }, [users]);

  return (
    <StyledPaper
      id="scroll-container-lol"
      sx={{ height: "600px", overflowY: "auto" }}
    >
      <StyledInfiniteScroll
        dataLength={users?.length || 0}
        next={handleLoadMore}
        hasMore={hasMoreUsers}
        loader={
          <StyledBox>
            <CircularProgress size={25} />
          </StyledBox>
        }
        scrollableTarget="scroll-container-lol"
      >
        {isDownSm ? (
          <MobileTable table={table} />
        ) : (
          <DesktopTable table={table} />
        )}
      </StyledInfiniteScroll>
    </StyledPaper>
  );
};

export default TableAdmin;
