import { FC, useEffect, useState } from "react";
import { Clear, FormatAlignLeft } from "@mui/icons-material";
import { useResponsive } from "shared/hooks";
import { useModal } from "react-modal-hook";
import {
  CircularProgress,
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";
import { LectureDto, Maybe } from "api/graphql/generated/graphql";
import {
  getCoreRowModel,
  type Table,
  useReactTable,
} from "@tanstack/react-table";

import MobileTable from "../mobile-table";
import DesktopTable from "../desktop-table";
import { ISelectLecture } from "./select-lecture.types";
import {
  StyledPaper,
  StyledBox,
  StyledButton,
  StyledButtonBox,
  StyledIconBox,
  StyledModalButton,
  StyledInfiniteScroll,
  StyledClearIcon,
  StyledDialogContent,
} from "./select-lecture.styled";

interface IModalTable {
  hideModal: () => void;
  open: boolean;
  table: Table<LectureDto>;
  hasMoreLectures: boolean;
  handleLoadMore: () => Promise<void>;
  lectures?: Maybe<Array<Maybe<LectureDto>>>;
}

const ModalTable = ({
  hideModal,
  open,
  lectures,
  hasMoreLectures,
  handleLoadMore,
  table,
}: IModalTable) => {
  const { isMobile } = useResponsive();

  const renderLoader = () => (
    <StyledBox>
      <CircularProgress size={25} />
    </StyledBox>
  );

  const renderMobileTable = () => (
    <Dialog open={open} onClose={hideModal} maxWidth="lg" fullScreen>
      <StyledDialogContent id="scroll-mobile-modal-container">
        <StyledIconBox>
          <IconButton onClick={hideModal}>
            <StyledClearIcon fontSize="small" />
          </IconButton>
        </StyledIconBox>
        <StyledInfiniteScroll
          dataLength={lectures?.length || 0}
          next={handleLoadMore}
          hasMore={hasMoreLectures}
          loader={renderLoader()}
          scrollableTarget="scroll-mobile-modal-container"
        >
          <MobileTable<LectureDto> table={table} />
        </StyledInfiniteScroll>
      </StyledDialogContent>
    </Dialog>
  );

  const renderDesktopTable = () => (
    <Dialog open={open} onClose={hideModal} maxWidth="lg" scroll="body">
      <DialogContent>
        <StyledButtonBox>
          <StyledModalButton
            onClick={hideModal}
            endIcon={<Clear fontSize="small" />}
            variant="contained"
          >
            Закрыть
          </StyledModalButton>
        </StyledButtonBox>
        <StyledPaper id="scroll-modal-container">
          <StyledInfiniteScroll
            dataLength={lectures?.length || 0}
            next={handleLoadMore}
            hasMore={hasMoreLectures}
            loader={renderLoader()}
            scrollableTarget="scroll-modal-container"
          >
            <DesktopTable<LectureDto> table={table} />
          </StyledInfiniteScroll>
        </StyledPaper>
      </DialogContent>
    </Dialog>
  );

  return isMobile ? renderMobileTable() : renderDesktopTable();
};

const SelectLecture: FC<ISelectLecture> = ({ data, fetchMore, columns }) => {
  const lectures = data?.lectures?.items;
  const { totalElements } = data?.lectures!;

  const [hasMoreLectures, setHasMoreLectures] = useState<boolean>(true);

  const table = useReactTable({
    data: lectures as LectureDto[],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const [showModal, hideModal] = useModal(
    ({ in: open }) => (
      <ModalTable
        hideModal={hideModal}
        open={open}
        lectures={lectures}
        handleLoadMore={handleLoadMore}
        hasMoreLectures={hasMoreLectures}
        table={table}
      />
    ),
    [lectures, table, hasMoreLectures]
  );

  const handleLoadMore = async () => {
    await fetchMore({
      variables: {
        offset: lectures?.length,
        limit: 30,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          lectures: {
            ...fetchMoreResult.lectures,
            items: [
              ...(prev?.lectures?.items || []),
              ...(fetchMoreResult?.lectures?.items || []),
            ],
          },
        };
      },
    });
  };

  const handleOpenModal = () => {
    showModal();
  };

  useEffect(() => {
    if (lectures?.length! >= totalElements) {
      setHasMoreLectures(false);
    }
  }, [lectures]);

  return (
    <StyledButton
      variant="contained"
      startIcon={<FormatAlignLeft fontSize="small" />}
      onClick={handleOpenModal}
    >
      Выбрать из списка
    </StyledButton>
  );
};

export default SelectLecture;
