import { FC, useEffect, useState } from "react";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { CircularProgress, Dialog } from "@mui/material";
import { UserDto } from "api/graphql/generated/graphql";
import useResponsive from "shared/hooks/use-responsive";
import { useModal } from "react-modal-hook";

import { ITable } from "./table.types";
import {
  StyledBox,
  StyledClearIcon,
  StyledInfiniteScroll,
  StyledLoadMoreButton,
  StyledPaper,
  StyledUsersDialogContent,
} from "./table.styled";
import DesktopTable from "../desktop-table";
import MobileTable from "../mobile-table";

const TableAdmin: FC<ITable> = ({ data, columns, fetchMore }) => {
  const users = data?.users?.items;
  const { totalElements } = data?.users!;
  const { isMobile, isMobileOrTablet, isDownDesktop } = useResponsive();

  const [hasMoreUsers, setHasMoreUsers] = useState<boolean>(true);

  const table = useReactTable({
    data: users as UserDto[],
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnVisibility: {
        email: !isDownDesktop,
        phoneNumber: !isMobileOrTablet,
      },
    },
  });

  const [showModal, hideModal] = useModal(({ in: open }) => (
    <Dialog open={open} onClose={hideModal} maxWidth="sm" fullWidth>
      <StyledUsersDialogContent id="scroll-mobile-container">
        <StyledClearIcon onClick={hideModal} />
        <StyledInfiniteScroll
          dataLength={users?.length || 0}
          next={handleLoadMore}
          hasMore={hasMoreUsers}
          loader={
            <StyledBox>
              <CircularProgress size={25} />
            </StyledBox>
          }
          scrollableTarget="scroll-mobile-container"
        >
          <MobileTable table={table} />
        </StyledInfiniteScroll>
      </StyledUsersDialogContent>
    </Dialog>
  ));

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
    <>
      {isMobile ? (
        <>
          <StyledPaper>
            <MobileTable table={table} />
          </StyledPaper>
          <StyledLoadMoreButton onClick={showModal}>
            Загрузить еще
          </StyledLoadMoreButton>
        </>
      ) : (
        <StyledPaper id="scroll-container">
          <StyledInfiniteScroll
            dataLength={users?.length || 0}
            next={handleLoadMore}
            hasMore={hasMoreUsers}
            loader={
              <StyledBox>
                <CircularProgress size={25} />
              </StyledBox>
            }
            scrollableTarget="scroll-container"
          >
            <DesktopTable table={table} />
          </StyledInfiniteScroll>
        </StyledPaper>
      )}
    </>
  );
};

export default TableAdmin;
