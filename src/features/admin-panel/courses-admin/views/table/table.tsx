import { FC, useEffect, useState } from "react";
import {
  getCoreRowModel,
  type Table,
  useReactTable,
} from "@tanstack/react-table";
import { Maybe, TrainingDto } from "api/graphql/generated/graphql";
import { CircularProgress, Dialog } from "@mui/material";
import { useModal } from "react-modal-hook";
import useResponsive from "shared/hooks/use-responsive";
import { Fullscreen } from "@mui/icons-material";

import { ITable } from "./table.types";
import {
  StyledBox,
  StyledClearIcon,
  StyledInfiniteScroll,
  StyledPaper,
  StyledUsersDialogContent,
  StyledLoadMoreButton,
} from "./table.styled";
import DesktopTable from "../desktop-table";
import MobileTable from "../mobile-table";

interface IModalMobileTable {
  hideModal: () => void;
  open: boolean;
  table: Table<TrainingDto>;
  hasMoreTrainings: boolean;
  handleLoadMore: () => Promise<void>;
  trainings?: Maybe<Array<Maybe<TrainingDto>>>;
}

const ModalMobileTable = ({
  hideModal,
  open,
  trainings,
  hasMoreTrainings,
  handleLoadMore,
  table,
}: IModalMobileTable) => {
  return (
    <Dialog open={open} onClose={hideModal} fullWidth fullScreen>
      <StyledUsersDialogContent id="scroll-container">
        <StyledClearIcon onClick={hideModal} />
        <StyledInfiniteScroll
          dataLength={trainings?.length || 0}
          next={handleLoadMore}
          hasMore={hasMoreTrainings}
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
  const trainings = data?.trainings?.items;
  const { totalElements } = data?.trainings!;
  const [hasMoreTrainings, setHasMoreTrainings] = useState<boolean>(true);
  const { isMobile } = useResponsive();

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

  const [showModal, hideModal] = useModal(
    ({ in: open }) => {
      const tableProps = {
        hideModal,
        open,
        trainings,
        handleLoadMore,
        hasMoreTrainings,
        table,
      };

      return <ModalMobileTable {...tableProps} />;
    },
    [trainings, table, hasMoreTrainings]
  );

  useEffect(() => {
    if (trainings?.length! >= totalElements) {
      setHasMoreTrainings(false);
    }
  }, [trainings]);

  return (
    <>
      {isMobile ? (
        <>
          <StyledLoadMoreButton onClick={showModal}>
            <Fullscreen color="primary" />
          </StyledLoadMoreButton>
          <StyledPaper id="scroll-mobile-container">
            <StyledInfiniteScroll
              dataLength={trainings?.length || 0}
              next={handleLoadMore}
              hasMore={hasMoreTrainings}
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
            dataLength={trainings?.length || 0}
            next={handleLoadMore}
            hasMore={hasMoreTrainings}
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
