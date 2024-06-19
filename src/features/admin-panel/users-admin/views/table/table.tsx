import { FC, useEffect, useState } from "react";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { CircularProgress, Dialog } from "@mui/material";
import { UserDto } from "api/graphql/generated/graphql";
import { useResponsive } from "shared/hooks";
import { useModal } from "react-modal-hook";
import { Fullscreen } from "@mui/icons-material";
import ContentNotFound from "shared/components/content-not-found";
import { ReactComponent as UsersNotFound } from "assets/images/user-not-found.svg";

import { IModalMobileTable, ITable } from "./table.types";
import {
  StyledBox,
  StyledClearIcon,
  StyledIconBox,
  StyledInfiniteScroll,
  StyledLoadMoreButton,
  StyledPaper,
  StyledUsersDialogContent,
} from "./table.styled";
import DesktopTable from "../desktop-table";
import MobileTable from "../mobile-table";

const renderLoader = () => (
  <StyledBox>
    <CircularProgress size={25} />
  </StyledBox>
);

const ModalMobileTable = ({
  hideModal,
  open,
  users,
  handleLoadMore,
  hasMoreUsers,
  table,
}: IModalMobileTable) => {
  return (
    <Dialog open={open} onClose={hideModal} fullWidth fullScreen>
      <StyledUsersDialogContent id="scroll-container">
        <StyledIconBox>
          <StyledClearIcon onClick={hideModal} />
        </StyledIconBox>
        <StyledInfiniteScroll
          dataLength={users?.length || 0}
          next={handleLoadMore}
          hasMore={hasMoreUsers}
          loader={renderLoader()}
          scrollableTarget="scroll-container"
        >
          <MobileTable table={table} />
        </StyledInfiniteScroll>
      </StyledUsersDialogContent>
    </Dialog>
  );
};

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

  const [showModal, hideModal] = useModal(
    ({ in: open }) => (
      <ModalMobileTable
        hideModal={hideModal}
        open={open}
        users={users}
        handleLoadMore={handleLoadMore}
        hasMoreUsers={hasMoreUsers}
        table={table}
      />
    ),
    [users, table, hasMoreUsers]
  );

  if (!users?.length) {
    return (
      <ContentNotFound text="Пользователь не найден" icon={<UsersNotFound />} />
    );
  }

  const renderMobileTable = () => (
    <>
      <StyledLoadMoreButton onClick={showModal}>
        <Fullscreen color="primary" />
      </StyledLoadMoreButton>
      <StyledPaper id="scroll-mobile-container">
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
    </>
  );

  const renderDesktopTable = () => (
    <StyledPaper id="scroll-container">
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
