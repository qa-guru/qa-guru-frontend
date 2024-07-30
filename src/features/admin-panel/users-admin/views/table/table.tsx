import { FC, useEffect, useState } from "react";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { CircularProgress } from "@mui/material";

import { ReactComponent as UsersNotFound } from "assets/images/user-not-found.svg";
import { UserDto } from "api/graphql/generated/graphql";
import { useResponsive } from "shared/hooks";
import ContentNotFound from "shared/components/content-not-found";

import { ITable } from "./table.types";
import { StyledBox, StyledInfiniteScroll, StyledPaper } from "./table.styled";
import DesktopTable from "../desktop-table";
import MobileTable from "../mobile-table";

const renderLoader = () => (
  <StyledBox>
    <CircularProgress size={25} />
  </StyledBox>
);

const TableAdmin: FC<ITable> = ({ data, columns, fetchMore }) => {
  const users = data?.users?.items;
  const { totalElements } = data?.users!;
  const { isMobile, isTablet, isDownDesktop } = useResponsive();
  const [hasMoreUsers, setHasMoreUsers] = useState<boolean>(true);

  const table = useReactTable({
    data: users as UserDto[],
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnVisibility: {
        phoneNumber: !isDownDesktop,
        email: !isTablet,
      },
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

  if (!users?.length) {
    return (
      <ContentNotFound text="Пользователь не найден" icon={<UsersNotFound />} />
    );
  }

  const renderMobileTable = () => (
    <StyledPaper hasMoreUsers={hasMoreUsers}>
      <StyledInfiniteScroll
        dataLength={users?.length || 0}
        next={handleLoadMore}
        hasMore={hasMoreUsers}
        loader={renderLoader()}
        scrollableTarget="scroll-mobile-container"
      >
        <MobileTable table={table} />
      </StyledInfiniteScroll>
    </StyledPaper>
  );

  const renderDesktopTable = () => (
    <StyledPaper hasMoreUsers={hasMoreUsers}>
      <StyledInfiniteScroll
        dataLength={users?.length || 0}
        next={handleLoadMore}
        hasMore={hasMoreUsers}
        loader={renderLoader()}
        scrollableTarget="scroll-container"
      >
        <DesktopTable table={table} />
      </StyledInfiniteScroll>
    </StyledPaper>
  );

  useEffect(() => {
    if (users?.length! >= totalElements) {
      setHasMoreUsers(false);
    }
  }, [users]);

  return isMobile ? renderMobileTable() : renderDesktopTable();
};

export default TableAdmin;
