import { FC, useEffect, useState } from "react";
import {
  type Table,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { CircularProgress, Dialog, Typography } from "@mui/material";
import { Maybe, UserDto } from "api/graphql/generated/graphql";
import useResponsive from "shared/hooks/use-responsive";
import { useModal } from "react-modal-hook";
import { Fullscreen } from "@mui/icons-material";
import { ReactComponent as UsersNotFound } from "assets/images/user-not-found.svg";

import { ITable } from "./table.types";
import {
  StyledBox,
  StyledClearIcon,
  StyledInfiniteScroll,
  StyledLoadMoreButton,
  StyledNotFoundBox,
  StyledPaper,
  StyledUsersDialogContent,
} from "./table.styled";
import DesktopTable from "../desktop-table";
import MobileTable from "../mobile-table";

interface IModalMobileTable {
  hideModal: () => void;
  open: boolean;
  table: Table<UserDto>;
  hasMoreUsers: boolean;
  handleLoadMore: () => Promise<void>;
  users?: Maybe<Array<Maybe<UserDto>>>;
}

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
  const { isMobile, isTablet, isMobileOrTablet, isDownDesktop } =
    useResponsive();
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
    ({ in: open }) => {
      const tableProps = {
        hideModal,
        open,
        users,
        handleLoadMore,
        hasMoreUsers,
        table,
      };

      return <ModalMobileTable {...tableProps} />;
    },
    [users, table, hasMoreUsers]
  );

  useEffect(() => {
    if (users?.length! >= totalElements) {
      setHasMoreUsers(false);
    }
  }, [users]);

  if (!users?.length) {
    return (
      <StyledNotFoundBox>
        <UsersNotFound />
        <Typography variant="h3" color="textSecondary">
          Пользователь не найден
        </Typography>
      </StyledNotFoundBox>
    );
  }

  return (
    <>
      {isMobile ? (
        <>
          <StyledLoadMoreButton onClick={showModal}>
            <Fullscreen color="primary" />
          </StyledLoadMoreButton>
          <StyledPaper id="scroll-mobile-container">
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
          </StyledPaper>
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
