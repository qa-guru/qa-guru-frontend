import React, { useEffect, useRef, useState } from "react";
import { useDrop } from "react-dnd";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
  Typography,
} from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import { useModal } from "react-modal-hook";
import { CardType, IColumn } from "./column.types";
import { style } from "./styles";
import Card from "../card";
import { getColumnStyles } from "../../helpers/get-column-styles";
import { isColumnHighlight } from "../../helpers/is-column-highlight";
import { StudentHomeWorkDto } from "../../../../../../../../Downloads/qa-guru-frontend-develop 2/src/api/graphql/generated/graphql";

const Column: React.FC<IColumn> = ({
  column,
  onCardDrop,
  draggingState,
  setDraggingState,
  fetchMore,
  onCardClick,
  activeCardId,
}) => {
  const [hasMoreHomeworks, setHasMoreHomeworks] = useState<boolean>(true);
  const [showButton, setShowButton] = useState<boolean>(true);
  const droppedItem = useRef<CardType | null>(null);
  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: "card",
    drop: (item: CardType) => {
      if (item.allowedColumns.includes(column.id)) {
        droppedItem.current = item;
        showModal();
      }
    },

    canDrop: (item: { allowedColumns: string[] }) =>
      item.allowedColumns.includes(column.id),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  const [showModal, hideModal] = useModal(({ in: open }) => (
    <Dialog open={open} onClose={hideModal} maxWidth="xs">
      <DialogContent>
        Вы уверены, что хотите поменять статус данной домашней работы?
      </DialogContent>
      <DialogActions>
        <Button color="secondary" variant="contained" onClick={handleCancel}>
          Нет
        </Button>
        <Button variant="contained" onClick={handleOk}>
          Да
        </Button>
      </DialogActions>
    </Dialog>
  ));

  const handleOk = async () => {
    if (droppedItem.current) {
      await onCardDrop(
        droppedItem.current.id,
        droppedItem.current.sourceColumnId,
        column.id
      );
      droppedItem.current = null;
      hideModal();

      const containerElement = document.getElementById(
        `scroll-container-${column.id}`
      );
      if (containerElement) {
        containerElement.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }
  };

  const handleCancel = () => {
    droppedItem.current = null;
    hideModal();
  };

  const handleLoadMore = () => {
    setShowButton(false);
    fetchMore({
      variables: {
        offset: column.cards?.length,
      },
      updateQuery: (
        prev: { homeWorks: { items: StudentHomeWorkDto[] } },
        {
          fetchMoreResult,
        }: { fetchMoreResult: { homeWorks: { items: StudentHomeWorkDto[] } } }
      ) => {
        if (!fetchMoreResult) return prev;

        return {
          homeWorks: {
            ...fetchMoreResult.homeWorks,
            items: [
              ...prev.homeWorks.items,
              ...fetchMoreResult.homeWorks.items,
            ],
          },
        };
      },
    });
  };

  useEffect(() => {
    if (column.cards?.length >= column.totalElements) {
      setHasMoreHomeworks(false);
    }
  }, [column.cards?.length]);

  const formatStatus = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "Approved";
      case "IN_REVIEW":
        return "In review";
      case "NEW":
        return "New";
      case "NOT_APPROVED":
        return "Not approved";
      default:
        return status;
    }
  };

  return (
    <Box
      width={{ xs: "100%", md: "25%" }}
      flexGrow="1"
      display="flex"
      flexDirection="column"
    >
      <Stack direction="row">
        <Typography fontSize="20px" ml={1} mb={1}>
          {formatStatus(column.title)}
        </Typography>
        <Typography fontSize="20px" ml={1}>
          {Number(column.totalElements) === 0
            ? "(empty)"
            : `(${column.totalElements})`}
        </Typography>
      </Stack>
      <Box
        id={`scroll-container-${column.id}`}
        ref={dropRef}
        flexGrow="1"
        mt="5px"
        sx={{
          ...getColumnStyles(column.id, draggingState, isOver),
          boxSizing: "border-box",
          overflowY: showButton ? "hidden" : "auto",
          maxHeight: { xs: "73vh", lg: "69vh" },
          backgroundColor:
            Number(column.totalElements) === 0 ? style.emptyColumn : "inherit",
          ...(isColumnHighlight(column.id, draggingState) && {
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }),
        }}
      >
        <InfiniteScroll
          dataLength={column.cards?.length}
          next={handleLoadMore}
          hasMore={hasMoreHomeworks}
          loader={
            <Box mt="10px" display="flex" justifyContent="center">
              <CircularProgress size={25} />
            </Box>
          }
          style={{ overflow: "visible" }}
          scrollableTarget={`scroll-container-${column.id}`}
        >
          {column.cards?.map((card, index) => (
            <Box mb={2}>
              <Card
                key={`${card.id}-${index}`}
                card={card}
                sourceColumnId={column.id}
                setDraggingState={setDraggingState}
                isCardsHidden={isColumnHighlight(column.id, draggingState)}
                onCardClick={() => onCardClick!(card)}
                isActive={activeCardId === card.id}
              />
            </Box>
          ))}
        </InfiniteScroll>
      </Box>
      {showButton && hasMoreHomeworks && (
        <Button sx={style.loadMoreBtn} onClick={handleLoadMore}>
          Загрузить еще
        </Button>
      )}
    </Box>
  );
};

export default Column;
